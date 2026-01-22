from django.shortcuts import render, get_object_or_404
from rest_framework.generics import (
    CreateAPIView, ListAPIView, RetrieveAPIView,
)

from decimal import Decimal
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.exceptions import ValidationError

from .models import Order
from .serializers import OrderSerializer
from products.models import Product
from .services import send_sms    

class MyOrderView(ListAPIView):
    queryset =Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes= [IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user.profile)
    
class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()

class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_classes = OrderSerializer
    
    @transaction.atomic
    def post(self, request):
        product_id = request.data.get("product_id")
        
        if not product_id:
            raise ValidationError("product id обязателен!")
        
        product = get_object_or_404(
            Product.objects.select_for_update(),
            id=product_id
        )
        buyer = request.user.profile
        
        if product.seller == buyer:
            raise ValidationError("Невозможно купить свой товар!")
        
        price = product.price
        commission = price * Decimal("0.10")
        
        if buyer.balance < price:
            raise ValidationError("Недостаточно средств!")
        
        # Заморозка денег 🔒
        buyer.balance -= price
        buyer.frozen_balance += price
        buyer.save()
        
        order = Order.objects.create(
            product=product,
            buyer=buyer,
            seller=product.seller,
            price=price,
            commission=commission,
        )
        
        return Response({
            "order_id": order.id,
            "status": order.status
        })
        
class SellerConfirmOrderView(APIView):
    permission_classes = [IsAuthenticated]
    
    @transaction.atomic
    def post(self, request, order_id):
        order = Order.objects.select_for_update().get(id=order_id)
        
        if order.seller != request.user.profile:
            raise ValidationError("You are seller this item!")
        if order.seller != "pending":
            raise ValidationError("Wrong item status!")
        
        send_sms(
            product.seller.phone,
            f"Ваш товар '{product.title}' был куплен. Подтвердите заказ!"
        )
        
        order.status = "seller_confirmed"
        order.save()
        
        print(f"Заказ {order.id} подтверждён продавцом!")
        
        return Response({"status": order.status})
    
class BuyerConfirmOrderView(APIView):
    permission_classes = [IsAuthenticated]
    
    @transaction.atomic
    def post(self, request, order_id):
        order = Order.objects.select_for_update().get(id=order_id)
        
        if order.buyer != request.user.profile:
            raise ValidationError("Вы не покупатель заказа!")
        
        if order.status != "seller_confirmed":
            raise ValidationError("Продавец еще не подтвердил!")
        
        buyer = order.buyer
        seller = order.seller
        
        buyer.frozen_balance -=order.price
        seller.balance +=(order.price - order.commission)
        
        buyer.save()
        seller.save()
        
        order.status = "completed"
        order.save()
        
        return Response({"status": "completed"})