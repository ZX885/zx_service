from .models import ProductAttribute, ProductType,ProductAttributeValue,Product
from rest_framework import serializers

class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = ['id', 'name', 'field_type']

class ProductTypeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductType
        fields = ['id', 'category', 'title']

class ProductAttributeValueSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttributeValue
        fields = ['id', 'attribute', 'value']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields= ['id', 'seller','product_type','price','description','is_active', 'created_at']
