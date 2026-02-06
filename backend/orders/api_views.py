from django.shortcuts import render, get_object_or_404
from rest_framework.generics import (
    CreateAPIView, ListAPIView, RetrieveAPIView,
)

from decimal import Decimal
from django.db import transaction
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import ValidationError

from .serializers import OrderSerializer,OrderAttributeSerializer
from notifications.utils import notify
from .models import Order, OrderAttributeValue,OrderAttribute
from products.models import Product, ProductAttribute


class MyOrderView(ListAPIView):
    queryset =Order.objects.all()
    serializer_class = OrderSerializer
    permission_classes= [IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user.profile)

class MyPurchaseView(ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        status = self.request.query_params.get("status")
        qs = Order.objects.filter(buyer=self.request.user.profile)
        
        if status =="active":
            qs = qs.exclude(status="Завершён")
        elif status == "completed":
            qs = qs.filter(status="Завершён")
        
        return qs.order_by("-created_at")
        
class SellerOrderView(ListAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(
            seller = self.request.user.profile
        )

class OrderDetailView(RetrieveAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    queryset = Order.objects.all()

class OrderAttributeByProductView(ListAPIView):
    serializer_class = OrderAttributeSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        product_id = self.kwargs["product_id"]
        product = Product.objects.get(id=product_id)
        return OrderAttribute.objects.filter(product_type=product.product_type)


class CreateOrderView(APIView):
    permission_classes = [IsAuthenticated]

    @transaction.atomic
    def post(self, request):
        product_id = request.data.get("product_id")
        attributes = request.data.get("attribute_values", [])

        if not product_id:
            raise ValidationError("product_id обязателен")

        product = Product.objects.select_for_update().get(id=product_id)
        product = get_object_or_404(Product, id=product_id)
        
        buyer = request.user.profile

        if product.seller == buyer:
            raise ValidationError("Нельзя купить свой товар")

        # Запрет покупки проданного товара
        if product.status !="active":
            return Response(
                {"error":"Товар уже продан или недоступен"},
                status=400
            )
        
        # 1️⃣ Проверяем обязательные buyer-атрибуты
        required_attrs = OrderAttribute.objects.filter(
            product_type=product.product_type,
            # owner="buyer",
            required=True
        )
        
        # Запрет покупки если balance <= price
        
        # if buyer.balance == 0 :
        #     raise ValidationError("Пожалуйста пополните денег!")
        sent_attr_ids = [a["attribute"] for a in attributes]
        if request.user.profile.balance < product.price:
            return Response(
                {"detail": " Недостаточно средств!"},
                status=status.HTTP_400_BAD_REQUEST
            )
        buyer.balance -= product.price
        buyer.frozen_balance += product.price
        buyer.save() 
        
        for attr in required_attrs:
            if attr.id not in sent_attr_ids:
                raise ValidationError(f"Поле '{attr.name}' обязательно")

        # 2️⃣ Создаем заказ
        order = Order.objects.create(
            product=product,
            buyer=buyer,
            seller=product.seller,
            price=product.price,
            commission=product.price * Decimal("0.1")
        )

        # 3️⃣ Сохраняем buyer-данные
        for attr in attributes:
            OrderAttributeValue.objects.create(
                order=order,
                attribute_id=attr["attribute"],
                value=attr["value"]
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
        # if order.seller != "pending":
        #     raise ValidationError("Wrong item status!")
        
        
        order.status = "Продавец подтвердил"
        order.save()
        
        notify(
            order.buyer,
            "Заказ подтверждён продавцом",
            f"Продавец подтвердил заказ #{order.id}"
        )
        print(f"Заказ {order.id} подтверждён продавцом!")
        
        return Response({"status": order.status})
    
class BuyerConfirmOrderView(APIView):
    permission_classes = [IsAuthenticated]
    
    @transaction.atomic
    def post(self, request, order_id):
        order = Order.objects.select_for_update().get(id=order_id)
        
        if order.buyer != request.user.profile:
            raise ValidationError("Вы не покупатель заказа!")
        
        if order.status != "Продавец подтвердил":
            raise ValidationError("Продавец еще не подтвердил!")
        
        buyer = order.buyer
        seller = order.seller
        
        buyer.frozen_balance -=order.price
        seller.balance +=(order.price - order.commission)
        buyer.save()
        seller.save()
        
        order.status = "Завершён"
        notify(
            order.seller,
            "Сделка завершена",
            f"Покупатель подтвердил заказ #{order.id}"
        )
        order.save()
        product = order.product
        product.status = "sold"
        product.is_active = False
        product.save()
        
        return Response({"status": "Завершён"})

