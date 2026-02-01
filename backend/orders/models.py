from django.db import models
from users.models import Profile 
from products.models import Product, ProductType


class Order(models.Model):
    STATUS_CHOICES = (
        ("Ожидание", "Ожидание"),
        ("Продавец подтвердил", "Продавец подтвердил"),
        ("Покупатель подтвердил", "Покупатель подтвердил"),
        ("Завершён", "Завершён"),
        ("Отменён", "Отменён"),
    )
    
    product = models.ForeignKey(Product, on_delete=models.CASCADE, related_name="orders")
    buyer = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="orders")
    seller = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="sales")
    
    price = models.DecimalField(max_digits=10, decimal_places=2)
    commission = models.DecimalField(max_digits=10, decimal_places=2)
    
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, default="Ожидание")
    created_at = models.DateTimeField(auto_now_add=True)
    
    
    def __str__(self):
        return f"Order #{self.id} - {self.product}"
    
class OrderAttribute(models.Model):
    product_type = models.ForeignKey(
        ProductType,
        on_delete=models.CASCADE,
        related_name="order_attributes")
    name=models.CharField(max_length=100)
    field_type=models.CharField(
        max_length=50,
        choices=(
            ("text", "Text"),
            ("number", "Number"),
            ("boolean", "Boolean"),
        ))
    required = models.BooleanField(default=True)
    
    def __str__(self):
        return f"{self.product_type.title} > {self.name}"
    

class OrderAttributeValue(models.Model):
    order = models.ForeignKey(
        Order,
        on_delete=models.CASCADE, 
        related_name="order_attribute_value")
    attribute = models.ForeignKey(
        OrderAttribute,
        on_delete=models.CASCADE)
    value = models.TextField()
    
    def __str__(self):
        return f"Заказ {self.order.id} | {self.attribute.name}"
    
    