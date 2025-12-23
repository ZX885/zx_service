from django.db import models

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
    
    
    