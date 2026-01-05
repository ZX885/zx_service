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
    
    def __str__(self):
        return f"{self.category.title} > {self.title}"
    

  
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
    
    def __str__(self):
        return f"{self.product_type.title} > {self.name}"

class Product(models.Model):
    # name = models.TextField()
    seller = models.ForeignKey(Profile, on_delete=models.CASCADE)
    product_type = models.ForeignKey(ProductType, on_delete=models.CASCADE, related_name='products')
    
    price = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    is_active = models.BooleanField(default=True)
    image = models.ImageField(
        upload_to="products/img",
        null=True,
        blank=True
    )
    created_at = models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return f"{self.product_type.title} | {self.price}"
    
       
    
    
class ProductAttributeValue(models.Model):
    product = models.ForeignKey(
            Product, 
            on_delete=models.CASCADE,
            related_name="attributes"
        )
    attribute = models.ForeignKey(
        ProductAttribute, 
        on_delete=models.CASCADE
    )
    value = models.TextField()
    
    def __str__(self):
        return f"{self.product.id} | {self.attribute.name}: {self.value}"
    