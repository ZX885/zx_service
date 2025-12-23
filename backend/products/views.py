from django.shortcuts import render
from rest_framework.generics import ListAPIView
from .serializers import ProductAttributeSerializer
from .models import ProductAttribute

class ProductAttributeView(ListAPIView):
    serializer_class = ProductAttributeSerializer
    
    def get_queryset(self):
        product_type_id = self.kwargs['product_type_id']
        return ProductAttribute.objects.filter(product_type_id=product_type_id)
    
