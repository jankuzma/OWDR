from django.db import models


class Category(models.Model):
    name = models.CharField(max_length=255)


class Institution(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()

    INSTITUITION_CHOICES = [
        ("foundation", "fundacja"),
        ("ngo", "organizacja pozarządowa"),
        ("local-org", "zbiórka lokalna"),
    ]

    type = models.CharField(choices=INSTITUITION_CHOICES, default="foundation")

class