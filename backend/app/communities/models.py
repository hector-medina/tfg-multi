from django.db import models
from accounts.models import User
from django.core.validators import MinLengthValidator


class Neighborhood(models.Model):
    name = models.CharField(max_length=200)
    admin = models.ForeignKey(User, related_name='communities_admin', on_delete=models.CASCADE)
    president = models.ForeignKey(User, related_name='communities_president', on_delete=models.CASCADE)
    creation_date = models.DateField(auto_now_add=True)
    bank_account = models.ForeignKey('BankAccount', on_delete=models.CASCADE)
    address = models.CharField(max_length=150, default=None, blank=True, null=True)

    def __str__(self):
        neighborhood = '{} - {}'.format(self.id, self.name)
        return neighborhood


class BankAccount(models.Model):
    name = models.CharField(max_length=200)
    balance = models.DecimalField(max_digits=10, decimal_places=2, default=0.00)
    number = models.CharField(max_length=24, validators=[MinLengthValidator(24)])

    def __str__(self):
        bankAccount = '{} {}'.format(self.id, self.name)
        return bankAccount
