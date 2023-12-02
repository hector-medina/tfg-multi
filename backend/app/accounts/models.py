from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):

    phone = models.CharField(max_length=150, default=None, blank=True, null=True)
    dni = models.CharField(max_length=150, default=None, blank=True, null=True)
    acceptsPrivacyPolicy = models.BooleanField(default=False)
    
    def get_email(self):
        return self.email

    def format_dni(self, dni):
        dni = str(dni)
        if len(dni) == 9:
            formatted_dni = '{}.{}.{}-{}'.format(dni[0:2], dni[2:5], dni[5:8], dni[8])
            return formatted_dni
        else:
            return 'DNI format invalid'

    def get_dni(self):
        return self.format_dni(self.dni)

    def get_acceptsPrivacyPolicy(self):
        accetsPrivacyPolicy = False
        if self.acceptsPrivacyPolicy is not None:
            accetsPrivacyPolicy = self.acceptsPrivacyPolicy
        return accetsPrivacyPolicy
