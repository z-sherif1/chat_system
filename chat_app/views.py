from django.shortcuts import render,redirect,get_object_or_404
from django.contrib.auth.models import User
from django.contrib.auth.mixins import LoginRequiredMixin
from django.views.generic import ListView,DetailView,TemplateView
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from django.views.decorators.http import require_POST

from .models import *
# Create your views here.
@login_required
def home(request):

    # Get all users except current user
    users = User.objects.exclude(
        id=request.user.id
    )

    # Get all chats of current user
    chats = Chat.objects.filter(
        participants=request.user
    )

    context = {
        'users': users,
        'chats': chats,
    }

    return render(request, 'chat_app/home.html', context)

@login_required
def start_chat(request, user_id):
    friend = get_object_or_404(User, id=user_id)

    if friend == request.user:
        return redirect('home')

    chats = Chat.objects.filter(participants=request.user).filter(participants=friend)

    if chats.exists():
        chat = chats.first()
    else:
        chat = Chat.objects.create()
        chat.participants.add(request.user, friend)

    return redirect('chat_detail', pk=chat.id)

# chat detail
class ChatDetailView(LoginRequiredMixin, DetailView):
    model= Chat
    template_name = 'chat_app/chat_detail.html'
    context_object_name = 'chat'

    def get_queryset(self):
        chat = Chat.objects.filter(participants=self.request.user)
        return chat

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        # Mark unread messages from other participant as read
        self.object.messages.filter(is_read=False).exclude(sender=self.request.user).update(is_read=True)
        context['messages'] = self.object.messages.all().order_by('created_at') 
        context['friend'] = self.object.participants.exclude(id=self.request.user.id).first()
        return context

@login_required
@require_POST
def send_message(request, chat_id):
    chat = get_object_or_404(Chat, id=chat_id, participants=request.user)

    content = request.POST.get('content', '').strip()
    if content:
        Message.objects.create(
            chat=chat,
            sender = request.user,
            content=content
        )
    return redirect('chat_detail', pk=chat.id)