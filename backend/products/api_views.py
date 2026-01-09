from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.generics import ListAPIView, ListCreateAPIView, RetrieveAPIView
from .serializers import ProductAttributeSerializer, ProductTypeSerializer, ProductSerializer
from .models import (
    ProductAttribute,
    ProductType,
    Product,
    ProductAttributeValue
    )

class ProductTypeListView(ListAPIView):
    serializer_class = ProductTypeSerializer
    
    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return ProductType.objects.filter(category_id=category_id)

class ProductListView(ListAPIView):
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        qs = Product.objects.filter(is_active=True)
        product_type = self.request.query_params.get('type')
        if product_type:
            qs = qs.filter(product_type_id=product_type)
        return qs
        # return Product.objects.filter(product_type_id=product_type_id, is_active=True)
    
    

class ProductAttributeView(ListAPIView):
    serializer_class = ProductAttributeSerializer
    
    def get_queryset(self):
        product_type_id = self.kwargs['product_type_id']
        return ProductAttribute.objects.filter(
            product_type_id=product_type_id
            )
    
class ProductListCreateView(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    def perform_create(self, serializer):
        serializer.save(seller=self.request.user.profile)
    

class ProductDetailView(RetrieveAPIView):
    queryset = Product.objects.filter(is_active=True)
    serializer_class = ProductSerializer
    