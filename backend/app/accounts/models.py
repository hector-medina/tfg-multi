from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    phone = models.CharField(max_length=150, default=None, blank=True, null=True)
    dni = models.CharField(max_length=150, default=None, blank=True, null=True)

    pass
