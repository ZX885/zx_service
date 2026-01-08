from django.shortcuts import render
from rest_framework.generics import (
    CreateAPIView, ListAPIView, RetrieveAPIView
)
from rest_framework.permissions import IsAuthenticated
from .models import Order
from .serializers import OrderSerializer
from products.models import Product


class CreateOrderView(CreateAPIView):
    serializer_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        product_id = self.  request.data.get("product_id")
        product =   Product.objects.get(id=product_id)
        
        serializer.save(
            buyer=self.request.user,
            product=product,
            price=product.price
        )
    
class MyOrderView(ListAPIView):
    serialier_class = OrderSerializer
    permission_classes= [IsAuthenticated]
    
    def get_queryset(self):
        return Order.objects.filter(buyer=self.request.user)
    
class OrderDetailView(RetrieveAPIView):
    serialier_class = OrderSerializer
    permission_classes = [IsAuthenticated]
    
    queryset = Order.objects.all()
    