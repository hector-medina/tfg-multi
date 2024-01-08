from django.contrib.auth.models import AbstractUser
from django.db import models
from django.core.exceptions import ValidationError


def validate_file_size(value):
    filesize = value.size
    
    if filesize > 104857600:
        raise ValidationError("The maximum file size that can be uploaded is 10MB")
    else:
        return value

class UserImage(models.Model):
    image = models.ImageField(upload_to='profile/', max_length=2000, validators=[validate_file_size])


class User(AbstractUser):
    
    email = models.EmailField(unique=True)
    phone = models.CharField(max_length=150, default=None, blank=True, null=True)
    dni = models.CharField(max_length=150, default=None, blank=True, null=True)
    acceptsPrivacyPolicy = models.BooleanField(default=True)
    image = models.ForeignKey(UserImage, default=None, on_delete=models.SET_NULL, blank=True, null=True)
    address = models.CharField(max_length=150, default=None, blank=True, null=True)
    
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
