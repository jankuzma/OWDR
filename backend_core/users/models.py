from django.contrib.auth.models import AbstractUser
from django.db import models


class CustomUser(AbstractUser):
    USERNAME_FIELD = 'email'
    email = models.EmailField('email address', unique=True)
    REQUIRED_FIELDS = []