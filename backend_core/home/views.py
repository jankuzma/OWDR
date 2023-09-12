from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import View
from django.views.generic import TemplateView

from core.models import Donation, Institution, Category


class HomeView(View):
    def get(self, request):
        donation_count = Donation.objects.count()
        institution_count = Institution.objects.count()
        institutions = Institution.objects.all()
        foundations = Institution.objects.filter(type="foundation")
        ngos = Institution.objects.filter(type="ngo")
        locals = Institution.objects.filter(type="local-org")
        ctx = {
            "donations_count": donation_count,
            "institutions_count": institution_count,
            "foundations": foundations,
            "ngos": ngos,
            "locals": locals,

        }
        return render(request, 'index.html', ctx)


class FormView(View):
    def get(self, request):
        user = request.user
        if user.is_authenticated:
            categories = Category.objects.all()
            institutions = Institution.objects.all()
            ctx = {
                "institutions": institutions,
                "categories": categories,
            }
            return render(request, 'form.html', ctx)
        else:
            return redirect(reverse('users:login'))
