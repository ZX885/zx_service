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
    name = serializers.CharField(source="attribute.name")
    
    class Meta:
        model = ProductAttributeValue
        fields = ['id', 'name', 'value']

class ProductSerializer(serializers.ModelSerializer):
    seller = serializers.StringRelatedField()
    attributes = ProductAttributeValueSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = Product
        fields= [
            'id',
            'seller',
            'product_type',
            'price',
            'description',
            'image',
            'attributes',
            'created_at'
            ]
