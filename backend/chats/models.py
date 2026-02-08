from django.db import models
from users.models import Profile
from orders.models import Order

class Chat(models.Model):
    order = models.OneToOneField(
        Order,
        on_delete=models.CASCADE,
        related_name="chat"
    )
    buyer = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="buyer_chats"
    )
    seller = models.ForeignKey(
        Profile,
        on_delete=models.CASCADE,
        related_name="seller_chats"
    )
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"Чат для заказа #{self.order.id}"
    
class Message(models.Model):
    chat = models.ForeignKey(
        Chat,
        on_delete=models.CASCADE,
        related_name="messages"
    )
    sender = models.ForeignKey(
        Profile,   
        on_delete=models.CASCADE
    )
    text = models.TextField()
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    def __str__(self):
        return f"Сообщение {self.id} от {self.sender.user.username}"
    
    
    