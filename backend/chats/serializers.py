from rest_framework import serializers
from .models import Chat, Message

class MessageSerializer(serializers.ModelSerializer):
    sender = serializers.CharField(
        source="sender.user.username",
        read_only=True
    )
    
    class Meta:
        model = Message
        fields = (
            "id",
            "sender",
            "text",
            "created_at",
        )
        
        
class ChatSerializers(serializers.ModelSerializer):
    messages = MessageSerializer(many=True, read_only=True)
    product_title = serializers.CharField(
        source="order.product.title",
        read_only=True
    )
    order_status = serializers.CharField(
        source="order.status",
        read_only=True
    )
    
    class Meta:
        model = Chat
        fields = (
            "id",
            "order",
            "product_title",
            "order_status",
            "buyer",
            "seller",
            "messages",
            "created_at",
        )