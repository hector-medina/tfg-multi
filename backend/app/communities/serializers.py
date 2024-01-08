from rest_framework import serializers
from .models import Neighborhood, BankAccount
from properties.serializers import PropertySerializer


class NeighborhoodSerializer(serializers.ModelSerializer):

    properties = PropertySerializer(many=True, read_only=True)

    class Meta:
        model = Neighborhood
        fields = ('id',
                  'name',
                  'admin',
                  'president',
                  'address',
                  'properties',
                  'bank_account',
                  'creation_date')


class BankAccountSerializer(serializers.ModelSerializer):
    class Meta:
        model = BankAccount
        fields = ('id', 'name', 'balance', 'number')
