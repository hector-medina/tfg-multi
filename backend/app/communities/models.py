from django.db import models
from accounts.models import User
from django.core.validators import MinLengthValidator
from django.utils import timezone


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
    number = models.CharField(max_length=24, validators=[MinLengthValidator(24)])

    def __str__(self):
        bankAccount = '{} {}'.format(self.id, self.name)
        return bankAccount


class Record(models.Model):
    transaction_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    bank_account = models.ForeignKey(BankAccount, on_delete=models.CASCADE, related_name='records')

    def __str__(self):
        record = '{} {}'.format(self.id, self.description)
        return record


class Debt(models.Model):
    transaction_date = models.DateField()
    amount = models.DecimalField(max_digits=10, decimal_places=2)
    description = models.TextField()
    bank_account = models.ForeignKey(BankAccount, on_delete=models.CASCADE, related_name='debts')

    def __str__(self):
        debt = '{} {}'.format(self.id, self.description)
        return debt


class Agreement(models.Model):
    name = models.CharField(max_length=255)
    description = models.TextField()
    pdf_file = models.FileField(upload_to='agreements/')
    neighborhood = models.ForeignKey(Neighborhood, on_delete=models.CASCADE, related_name='agreements')
    creation_date = models.DateTimeField(default=timezone.now, blank=True, null=True)

    def __str__(self):
        return self.nombre