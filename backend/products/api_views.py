from django.shortcuts import render
from rest_framework.permissions import IsAuthenticated
from rest_framework.exceptions import PermissionDenied
from rest_framework.generics import ListAPIView,DestroyAPIView,RetrieveUpdateAPIView, ListCreateAPIView, RetrieveAPIView
from .serializers import (
    ProductUpdateSerializer,
    ProductAttributeSerializer,
    ProductTypeSerializer,
    ProductSerializer,
    SellerProductSerializer
    )
from .models import (
    ProductAttribute,
    ProductType,
    Product,
    ProductAttributeValue
    )
class ProductTypeListView(ListAPIView):
    queryset = ProductType.objects.all()
    serializer_class = ProductTypeSerializer
    
class ProductIdListView(ListAPIView):
    serializer_class = ProductTypeSerializer
    
    def get_queryset(self):
        category_id = self.kwargs['category_id']
        return ProductType.objects.filter(category_id=category_id)

class ProductListView(ListCreateAPIView):
    queryset = Product.objects.all()
    serializer_class = ProductSerializer
    
    def get_queryset(self):
        qs = Product.objects.filter(is_active=True)
        product_type = self.request.query_params.get('type')
        if product_type:
            qs = qs.filter(product_type_id=product_type)
        return qs


class ProductAttributeView(ListAPIView):
    serializer_class = ProductAttributeSerializer
    
    def get_queryset(self):
        product_type_id = self.kwargs['product_type_id']
        return ProductAttribute.objects.filter(
            product_type_id=product_type_id
            )
    
class ProductDetailView(RetrieveAPIView):
    serializer_class = ProductSerializer
    queryset = Product.objects.filter(is_active=True).prefetch_related(
        "attribute_values__attribute"
    )
    
    
    
class MyProductView(ListAPIView):
    serializer_class = ProductSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Product.objects.filter(
            seller=self.request.user.profile,
            is_active=True
        )
class SellerProductDetailView(RetrieveAPIView):
    serializer_class = SellerProductSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        return Product.objects.filter(
            seller=self.request.user.profile
        ).prefetch_related(
            "attribute_values__attribute"
        )
        
class ProductDeleteView(DestroyAPIView):
    permission_classes = [IsAuthenticated]
    queryset= Product.objects.all()
    
    def perform_destroy(self, instance):
        if instance.seller != self.request.user.profile:
            raise PermissionDenied("Не ваш товар")
        instance.delete()
        
class ProductUpdateView(RetrieveUpdateAPIView):
    serializer_class = ProductUpdateSerializer
    permission_classes = [IsAuthenticated]
    queryset =Product.objects.prefetch_related(
        "attribute_values__attribute"
    )
    
    def get_serializer_context(self):
        return {"request" : self.request}
        
    def get_object(self):
        obj = super().get_object()
        if obj.seller != self.request.user.profile:
            raise PermissionDenied("Не ваш товар")
        return obj
        # return Product.objects.filter(seller=self.request.user.profile)