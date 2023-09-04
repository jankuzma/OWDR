from django.views.generic import TemplateView


class HomeView(TemplateView):
    template_name = 'index.html'


class FormView(TemplateView):
    template_name = 'form.html'



