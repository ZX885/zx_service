from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Order
        fields = (
            "id",
            "product",
            "buyer",
            "seller",
            "price",
            "commission",
            "status",
            "created_at",
        )
        read_only_fields = fields
        
        