from rest_framework import serializers
from .models import Neighborhood, BankAccount, Record, Debt, Agreement
from properties.serializers import PropertySerializer
from django.db.models import Sum
from django.utils import timezone


class AgreementSerializer(serializers.ModelSerializer):
    class Meta:
        model = Agreement
        fields = '__all__'


class NeighborhoodSerializer(serializers.ModelSerializer):

    properties = PropertySerializer(many=True, read_only=True)
    agreements = AgreementSerializer(many=True, read_only=True)

    class Meta:
        model = Neighborhood
        fields = ('id',
                  'name',
                  'admin',
                  'president',
                  'address',
                  'properties',
                  'bank_account',
                  'creation_date',
                  'agreements')

class RecordSerializer(serializers.ModelSerializer):
    class Meta:
        model = Record
        fields = ('id', 'amount', 'description', 'bank_account', 'transaction_date')


class DebtSerializer(serializers.ModelSerializer):
    class Meta:
        model = Debt
        fields = '__all__'


class BankAccountSerializer(serializers.ModelSerializer):

    balance = serializers.SerializerMethodField()
    expenses = serializers.SerializerMethodField()
    income = serializers.SerializerMethodField()

    total_debt = serializers.SerializerMethodField()
    increased_debt = serializers.SerializerMethodField()
    decreased_debt = serializers.SerializerMethodField()

    records = serializers.SerializerMethodField()
    debts = serializers.SerializerMethodField()
    
    class Meta:
        model = BankAccount
        fields = ('id', 'name', 'balance', 'expenses', 'number', 'income', 
                  'total_debt', 'increased_debt', 'decreased_debt', 'records', 
                  'debts')

    def get_balance(self, obj):
        balance = obj.records.aggregate(total_amount=Sum('amount'))['total_amount']
        if balance is None:
            balance = 0.00
        return balance
    
    def get_expenses(self, obj):
        now = timezone.now()
        expenses = obj.records.filter(
            amount__lt=0,
            transaction_date__month=now.month,
            transaction_date__year=now.year
        ).aggregate(total_amount=Sum('amount'))['total_amount']
        if expenses is None:
            expenses = 0.00
        return expenses

    def get_income(self, obj):
        now = timezone.now()
        income = obj.records.filter(
            amount__gte=0,
            transaction_date__month=now.month,
            transaction_date__year=now.year
        ).aggregate(total_amount=Sum('amount'))['total_amount']
        if income is None:
            income = 0.00
        return income
    
    def get_total_debt(self, obj):
        now = timezone.now()
        debt = obj.debts.filter(
            transaction_date__month=now.month,
            transaction_date__year=now.year
        ).aggregate(total_amount=Sum('amount'))['total_amount']
        if debt is None:
            debt = 0.00
        return debt
    
    def get_increased_debt(self, obj):
        now = timezone.now()
        debt = obj.debts.filter(
            amount__gte=0,
            transaction_date__month=now.month,
            transaction_date__year=now.year
        ).aggregate(total_amount=Sum('amount'))['total_amount']
        if debt is None:
            debt = 0.00
        return debt
    
    def get_decreased_debt(self, obj):
        now = timezone.now()
        debt = obj.debts.filter(
            amount__lt=0,
            transaction_date__month=now.month,
            transaction_date__year=now.year
        ).aggregate(total_amount=Sum('amount'))['total_amount']
        if debt is None:
            debt = 0.00
        return debt

    def get_records(self, obj):
        records = obj.records.all().order_by('-transaction_date')
        return RecordSerializer(records, many=True).data

    def get_debts(self, obj):
        records = obj.debts.all().order_by('-transaction_date')
        return DebtSerializer(records, many=True).data
