from django import forms

from core.models import Institution


class InstitutionForm(forms.ModelForm):
    class Meta:
        model = Institution
        fields = [""]