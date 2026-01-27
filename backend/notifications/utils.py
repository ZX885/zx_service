from .models import Notification
from .email import send_notification_email

def notify(user, title, message):
    print("NOTIFY USER: " , user)
    Notification.objects.create(
        user=user,
        title=title,
        message=message
    )
    
    if user.user.email:
        send_notification_email(
            user.user.email,
            title,
            message
        )