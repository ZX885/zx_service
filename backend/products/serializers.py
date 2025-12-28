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
        fields = ['id','___all___']

class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields= ['id', '___all__']
