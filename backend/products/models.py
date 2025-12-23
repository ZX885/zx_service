from django.db import models
from users.models import Profile
from catalog.models import Category


class ProductType(models.Model):
    category = models.ForeignKey(
        Category,
        on_delete=models.CASCADE,
        related_name="product_types"
    )
    title = models.CharField(max_length=100)

class Product(models.Model):
    seller = models.ForeignKey(Profile, on_delete=models.CASCADE)
    product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE)
    
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    
    created_at = models.DateTimeField(auto_now_add=True)
        
class ProductAttribute(models.Model):
    FIELD_TYPES = (
        ('text', 'Text'),
        ('number', 'Number'),
        ('boolean', 'Boolean'),
    )
    
    product_type = models.ForeignKey(
            ProductType,
            on_delete=models.CASCADE,
            related_name="attributes"
        )
    name = models.CharField(max_length=100)
    field_type =models.CharField(max_length=20, choices=FIELD_TYPES)
    
    
class ProductAttributeValue(models.Model):
    product = models.ForeignKey(
            Product, 
            on_delete=models.CASCADE,
            related_name="attributes"
        )
    attribute = models.ForeignKey(ProductAttribute, on_delete=models.CASCADE)
    value = models.TextField()