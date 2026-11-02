from django.urls import path
from .views import *
from django.contrib.auth.views import LogoutView

urlpatterns = [
    path('register/', register_view , name='register'),
    path('login/', UserLogin.as_view(), name='login'),
    path('logout/', LogoutView.as_view(), name='logout')
]
