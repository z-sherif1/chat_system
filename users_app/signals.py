from django.db.models.signals import post_save
from django.dispatch import receiver
from rest_framework.authtoken.models import Token
from django.contrib.auth.models import User

from .models import Profile

@receiver(post_save, sender=User)
def create_user_profile_and_token(sender, instance, created, **kwargs):
    if created:
        Profile.objects.get_or_create(user=instance)
        Token.objects.get_or_create(user=instance)

@receiver(post_save, sender=User)
def save_profile(sender, instance, **kwargs):
    if hasattr(instance, 'profile'):
        instance.profile.save()