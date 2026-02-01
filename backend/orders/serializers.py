from rest_framework import serializers
from .models import Order, OrderAttributeValue, OrderAttribute
from products.serializers import ProductAttributeSerializer


class OrderAttributeValueSerializer(serializers.ModelSerializer):
    attribute_name = serializers.CharField(
        source="attribute.name",
        read_only=True
    )
    
    class Meta:
        model = OrderAttributeValue
        fields = ("id", "attribute", "attribute_name", "value")
class OrderAttributeSerializer(serializers.ModelSerializer):
    class Meta:
        model = OrderAttribute
        fields = "__all__"

class OrderSerializer(serializers.ModelSerializer):
    order_attribute_value = OrderAttributeValueSerializer(many=True, read_only=True)
    buyer_username = serializers.CharField(
        source="buyer.user.username",
        read_only=True
    )
    seller_username = serializers.CharField(
        source="seller.user.username",
        read_only=True
    )
    attribute_values = ProductAttributeSerializer(many=True, read_only=True)
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
            "order_attribute_value",
            "attribute_values",
            "created_at",
        )
        read_only_fields = fields
        