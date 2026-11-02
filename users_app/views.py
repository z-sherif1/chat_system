from django.shortcuts import render,redirect, get_object_or_404
from .forms import RegisterForm
from django.contrib.auth import login
from django.contrib.auth.views import  LoginView

# Create your views here.
def register_view(request):
    if request.method == "POST":
        form = RegisterForm(request.POST)
        if form.is_valid():
            user = form.save()
            login(request,user)
            return redirect('home')
    else:
        form = RegisterForm()
    return render(request, 'users_app/register.html', {'form':form}) 

class UserLogin(LoginView):
    template_name = 'users_app/login.html'
    redirect_authenticated_user = True
