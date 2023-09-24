from django.urls import path

from . import views

app_name = 'home'

urlpatterns = [
    path('', views.HomeView.as_view(), name='home'),
    path('form/', views.FormView.as_view(), name='form'),
    path('form/confirmation', views.FormConfirmationView.as_view(), name='form-confirmation')
]
