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
    seller = serializers.StringRelatedField(read_only=True)
    attributes = ProductAttributeValueSerializer(
        many=True,
        read_only=True
    )
    class Meta:
        model = Product
        fields= [
            'id',
            'product_type',
            'price',
            'seller',
            'description',
            'image',
            'attributes',
            'created_at'
            ]
        read_only_fields = ['seller']
    
    # def create(self, validation_data):
    #     request = self.context["seller"]
    #     validation_data["seller"] = request.user
    #     return super().create(validation_data)
