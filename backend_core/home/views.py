from django.shortcuts import render
from django.views import View
from django.views.generic import TemplateView

from core.models import Donation, Institution


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


class FormView(TemplateView):
    template_name = 'form.html'

