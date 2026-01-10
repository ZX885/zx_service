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
    # seller = serializers.StringRelatedField(read_only=True)
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
            'description',
            'image',
            'attributes',
            'created_at'
            ]
        # read_only_fields = ['seller']
    
    def create(self, validation_data):
        attributes_data = validation_data.pop("attributes", [])
        request = self.context["request"]
        
        product = Product.objects.create(
            seller=request.user.profile,
            **validation_data
        )
        
        for attr in attributes_data:
            ProductAttributeValue.objects.create(
                product=product,
                attribute=attr["attribute"],
                value=attr["value"]
            )
        return product