from django.db import models
from users.models import Profile 
from products.models import Product


class Order(models.Model):
    STATUS_CHOICES = (
        ("pending", "Ожидание"),
        ("seller_confirmed", "Продавец подтвердил"),
        ("buyer_confirmed", "Покупатель подтвердил"),
        ("completed", "Завершён"),
        ("cancelled", "Отменён"),
    )
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="orders")
    buyer = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="orders")
    seller = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="sales")
    
    price = models.DecimalField(max_digits=10, decimal_places=2)
    commission = models.DecimalField(max_digits=10, decimal_places=2)
    
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="pending")
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return f"Order #{self.id} - {self.product}"
    