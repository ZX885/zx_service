from django.shortcuts import get_object_or_404
from rest_framework.generics import ListAPIView, CreateAPIView, RetrieveAPIView
from rest_framework.views import APIView 
from rest_framework.response import Response 
from rest_framework.exceptions import ValidationError 
from rest_framework.permissions import IsAuthenticated

from .models import Chat, Message
from .serializers import ChatSerializers, MessageSerializer
from orders.models import Order

class CreateChatView(APIView):
    permission_classes = [IsAuthenticated]
    
    def post(self, request, order_id):
        order = get_object_or_404(Order, id=order_id)
        profile = request.user.profile
        
        if profile != order.buyer and profile != order.seller:
            raise ValidationError("Нет доступа!")
        
        buyer = order.buyer
        seller = order.seller
        chat, created = Chat.objects.get_or_create(
            buyer=buyer,
            seller=seller
        )
        
        Message.objects.create(
            chat=chat,
            sender=profile,
            text=f"Покупка товара: {order.id}",
            order=order,
            is_system=True
        )
        return Response({
            "chat_id":chat.id,
            "created":created,
        })

class MyChatView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request):
        profile = request.user.profile

        chats = Chat.objects.filter(
            buyer=profile
        ) | Chat.objects.filter(
            seller=profile
        )
        
        data =[]
        for chat in chats.distinct():
            if profile == chat.buyer:
                other_user = chat.seller.user.username
            else:
                other_user = chat.buyer.user.username
                
            last_message = chat.messages.last()
            data.append({
                "id": chat.id,
                "with_user":other_user,
                "last_message": last_message.text if last_message else ""
            })
            return Response(data)

class ChatDetailView(APIView):
    permission_classes = [IsAuthenticated]
    
    def get(self, request, chat_id):
        chat = get_object_or_404(Chat, id=chat_id)
        profile = request.user.profile
        
        if profile not in [chat.buyer, chat.seller]:
            return Response({"error":"Нет доступа"}, status=403)

        message = Message.objects.filter(
            chat=chat
        ).order_by("created_at")
        if request.user.profile == chat.buyer:
            other_user = chat.seller.user.username
        else:
            other_user = chat.buyer.user.username
        data = {
            "id":chat.id,
            "with_user":other_user,
            "messages": MessageSerializer(
                chat.messages.order_by("created_at"),
                many=True
            ).data
        }
        return Response(data)
        
class SendMessageView(APIView):
    # serializer_class = MessageSerializer
    permission_classes = [IsAuthenticated]
    
    def post(self, request, chat_id):
        chat = Chat.objects.get(id=chat_id)
        profile = request.user.profile
        
        if profile != chat.buyer and profile != chat.seller:
            return Response(
                {"error":"Нет доступа к чату"},
                status=403
            )
        
        text = request.data.get("text")
        if not text:
            return Response(
                {"error":"Сообщение пустое"},
                status=400
            )
        message = Message.objects.create(
            chat=chat,
            sender=profile,
            text=text
        )
        serializer = MessageSerializer(message)
        return Response(serializer.data, status=201)