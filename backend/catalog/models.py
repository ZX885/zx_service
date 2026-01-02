from django.db import models
from PIL import Image
class RootCategory(models.Model):
    title = models.CharField(max_length=100)
    slug = models.SlugField(unique=True)
    
    def __str__(self):
        return self.title
    

class Platform(models.Model):
    root = models.ForeignKey(
            RootCategory,
            on_delete=models.CASCADE,
            related_name="platforms"
        )
    title =models.CharField(max_length=100)
    slug = models.SlugField()
    image = models.ImageField(upload_to='catalog/imgs',blank=True, null=True)
    
    def save(self, *args, **kwargs):
        super(Platform, self).save(*args, **kwargs)
        if self.image:
            img = Image.open(self.image.path)

    def delete(self, *args, **kwargs):
        image_url = self.image.path
        if image_url != '/media/furniture/default.jpg':
            os.remove(self.image.path)
        super().delete(*args, **kwargs)
    
    def __str__(self):
        return f"{self.root.title} > {self.title}"
    
    
class Category(models.Model):
    platform = models.ForeignKey(
            Platform,
            on_delete=models.CASCADE,
            related_name="categories"
        )
    title = models.CharField(max_length=100)
    slug = models.SlugField()
    
    def __str__(self):
        return f"{self.platform.title} > {self.title}"
    
    
    