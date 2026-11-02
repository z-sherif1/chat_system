
from django.urls import path
from .views import *

urlpatterns = [
    path('', home, name='home'),
    path('start-chat/<int:user_id>/', start_chat, name='start_chat'),
    path('chat/<int:pk>/', ChatDetailView.as_view(), name='chat_detail'),
    path('chat/<int:chat_id>/send/', send_message, name='send_message'),
]
