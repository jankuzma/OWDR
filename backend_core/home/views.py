from django.http import HttpResponse
from django.shortcuts import render, redirect
from django.urls import reverse
from django.views import View
from django.views.generic import TemplateView

from core.models import Donation, Institution, Category
from users.models import CustomUser


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

    def post(self, request):

        categories = request.POST['categories'],
        quantity = request.POST['bags'],
        institution_id = request.POST['institution'],
        address = request.POST['address'],
        city = request.POST['city'],
        zip_code = request.POST['postcode'],
        phone_number = request.POST['phone'],
        pick_up_date = request.POST['data'],
        pick_up_comment = request.POST['more_info'],
        pick_up_time = request.POST['time'],
        user_id = request.user.id

        try:
            d = Donation(
                institution=Institution.objects.get(id=request.POST['institution']),
                quantity=request.POST['bags'],
                address=request.POST['address'],
                city=request.POST['city'],
                zip_code=request.POST['postcode'],
                phone_number=request.POST['phone'],
                pick_up_date=request.POST['data'],
                pick_up_comment=request.POST['more_info'],
                pick_up_time=request.POST['time'],
                user=CustomUser.objects.get(id=request.user.id)
            )
            d.save()
            return redirect(reverse('home:form-confirmation'))
        except Exception as e:
            print(20 * "*")
            print(20 * "*")
            print(e)
            print(20 * "*")
            print(20 * "*")


class FormConfirmationView(TemplateView):
    template_name = 'form-confirmation.html'
