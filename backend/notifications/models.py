from django.db import models
from users.models import Profile

class Notification(models.Model):
    user = models.ForeignKey(Profile, on_delete=models.CASCADE, related_name="notifications")
    title = models.CharField( max_length=255)
    message = models.TextField()
    is_read = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return f"{self.user} - {self.title}"

    