from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import View
from django.views.generic import TemplateView, FormView

from home.views import HomeView

from users.models import CustomUser


class LoginView(View):
    def get(self, request):
        return render(request, 'login.html')

    def post(self, request):
        email = request.POST.get('email')
        password = request.POST.get('password')
        user = authenticate(username=email, password=password)
        print(user)
        if user is not None:
            login(request, user)
            return redirect(reverse('home:home'))
        else:
            return redirect(reverse('users:login'))


class CreateUserView(View):
    def get(self, request):
        return render(request, 'register.html')

    def post(self, request):
        password1 = request.POST['password1']
        password2 = request.POST['password2']
        if password1 == password2:
            return self.clean_user_create(request, password1)
        else:
            return redirect(reverse('users:register'))

    def clean_user_create(self, request, password1):
        first_name = request.POST['first_name']
        last_name = request.POST['last_name']
        email = request.POST['email']
        user = CustomUser.objects.create_user(
            username=f'{first_name}-{email}',
            first_name=first_name,
            last_name=last_name,
            email=email,
            password=password1,
        )
        user.save()
        return redirect(reverse('home:home'))


class LogoutView(View):
    def get(self, request):
        logout(request)
        return redirect('home:home')
