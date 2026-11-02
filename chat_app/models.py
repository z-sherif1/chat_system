from django.db import models
from django.contrib.auth.models import User

# Create your models here.


class Chat(models.Model):

    participants = models.ManyToManyField(
        User,
        related_name='chats'
    )

    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Chat {self.id}"


class Message(models.Model):

    chat = models.ForeignKey(
        Chat,
        on_delete=models.CASCADE,
        related_name='messages'
    )

    sender = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='sent_messages'
    )

    content = models.TextField()

    created_at = models.DateTimeField(auto_now_add=True)

    is_read = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.sender.username}: {self.content[:30]}"
