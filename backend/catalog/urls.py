from django.urls import path
from .views import (
    RootCategoryListView,
    PlatformListView,
    CategoryListView,
)

urlpatterns = [
    path('root-categories/', RootCategoryListView.as_view()),
    path('platforms/<int:root_id>/', PlatformListView.as_view()),
    path('categories/<int:platform_id>/', CategoryListView.as_view()),
]
