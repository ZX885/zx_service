from django.db import models
from users.models import Profile 
from products.models import Product


class Order(models.Model):
    buyer = models.ForeignKey(Profile, on_delete=models.CASCADE)
    product = models.ForeignKey(Product, on_delete=models.CASCADE)
    price = models.DecimalField(max_digits=10, decimal_places=2)
    status = models.CharField(...)