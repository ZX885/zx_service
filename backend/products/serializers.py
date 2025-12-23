from .models import ProductAttribute
from rest_framework import serializers

class ProductAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = ProductAttribute
        fields = ['id', 'name', 'field_type']