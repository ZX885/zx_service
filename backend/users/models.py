# # from django.contrib.auth.models import AbstractUser
# from django.db import models


# class Userz(models.Model):
#     is_seller = models.BooleanField(default=False)
#     is_admin = models.BooleanField(default=False)
    
# ////////////////////////////////////////////////
from django.contrib.auth.models import User
from django.db import models
from django.db.models.signals import post_save
from PIL import Image
# from django.utils import timezone
from django.dispatch import receiver

class Profile(models.Model):
    user = models.OneToOneField(User,  on_delete=models.CASCADE)
    image = models.ImageField(default='default.jpg',upload_to="profile_pics",)

    is_seller = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)
    
    def __str__(self):
        return f'{self.user.username} Профиль'
    
    def save(self, *args, **kwargs):
        super().save(*args, **kwargs)
        print(f'{self.image.path=}')
        img = Image.open(self.image.path)
        
        if img.height>300 or img.width>300:
            output_size = (300,300)
            img.thumbnail(output_size)
            img.save(self.image.path)
            
def create_user_profile(sender, instance, created, **kwargs):
    if created:
        Profiel.objects.create(user=instance)
        
@receiver(post_save, sender=User)
def save_user_profile(sender, instance, **kwargs):
    try:
        instance.profile.save()
    except Profile.DoesNotExist:
        Profile.objects.create(user=instance)