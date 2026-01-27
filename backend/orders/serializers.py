from rest_framework import serializers
from .models import Order

class OrderSerializer(serializers.ModelSerializer):
    buyer_username = serializers.CharField(
        source="buyer.user.username",
        read_only=True
    )
    seller_username = serializers.CharField(
        source="seller.user.username",
        read_only=True
    )
    product_title = serializers.CharField(
        source="product.title",
        read_only=True
    )
    class Meta:
        model = Order
        fields = (
            "id",
            "product",
            "buyer",
            "seller_username",
            "buyer_username",
            "product_title",
            "seller",
            "price",
            "commission",
            "status",
            "created_at",
        )
        read_only_fields = fields
        
        