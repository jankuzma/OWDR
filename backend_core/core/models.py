from django.db import models

from users.models import CustomUser


class Category(models.Model):
    name = models.CharField(max_length=255)

    def __str__(self):
        return self.name

class Institution(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    INSTITUITION_CHOICES = [
        ("foundation", "fundacja"),
        ("ngo", "organizacja pozarządowa"),
        ("local-org", "zbiórka lokalna"),
    ]

    type = models.CharField(max_length=64, choices=INSTITUITION_CHOICES, default="foundation")

    def __str__(self):
        return self.name


class Donation(models.Model):
    quantity = models.IntegerField()
    categories = models.ManyToManyField(Category)
    institution = models.ManyToManyField(Institution)
    address = models.CharField(max_length=256)
    phone_number = models.CharField(max_length=12)
    city = models.CharField(max_length=255)
    zip_code = models.CharField(max_length=12)
    pick_up_date = models.DateField()
    pick_up_time = models.TimeField()
    pick_up_comment = models.TextField()
    user = models.ForeignKey(CustomUser, default=None, null=True, on_delete=models.CASCADE)

    def __str__(self):
        return self.institution + " " + self.address