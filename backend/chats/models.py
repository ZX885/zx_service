from django.db import models
from users.models import Profile
from orders.models import Order

class Chat(models.Model):
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
    
    class Meta:
        unique_together =("buyer", "seller")
        
    def __str__(self):
        return f"Чат: {self.buyer.user.username} - {self.seller.user.username}"
    
class Message(models.Model):
    chat = models.ForeignKey(
        Chat,
        on_delete=models.CASCADE,
        related_name="messages"
    )
    sender = models.ForeignKey(Profile, on_delete=models.CASCADE)
    text = models.TextField()
    order = models.ForeignKey(
        Order, 
        null=True,
        blank=True,
        on_delete=models.SET_NULL)
    
    is_system = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    is_read = models.BooleanField(default=False)
    
    def __str__(self):
        return f"{self.sender.user.username}: {self.text[:30]}"
    
    
    