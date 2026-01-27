from django.urls import path
from .api_views import (
    MyNotificationView,
    MarkNotificationReadView,
)

urlpatterns = [
    path("my/", MyNotificationView.as_view()),
    path("<int:pk>/read/", MarkNotificationReadView.as_view()),
]
