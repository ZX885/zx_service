from django.urls import path
from .api_views import MyChatView, SendMessageView, ChatDetailView, CreateChatView

urlpatterns = [
    path("", MyChatView.as_view()),
    path("create/<int:order_id>/", CreateChatView.as_view()),
    path("<int:chat_id>/", ChatDetailView.as_view()),
    path("<int:chat_id>/send/", SendMessageView.as_view()),
]
