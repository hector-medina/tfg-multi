from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


from .serializers import (
    NeighborhoodSerializer, 
    BankAccountSerializer, 
    RecordSerializer, 
    DebtSerializer,
    AgreementSerializer)
from .models import Neighborhood, BankAccount, Record, Debt, Agreement


class NeighborhoodViewSet(viewsets.ModelViewSet):
    queryset = Neighborhood.objects.all()
    serializer_class = NeighborhoodSerializer

    def perform_destroy(self, instance):
        instance.bank_account.delete()
        instance.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)


class BankAccountViewSet(viewsets.ModelViewSet):
    queryset = BankAccount.objects.all()
    serializer_class = BankAccountSerializer


class RecordViewSet(viewsets.ModelViewSet):
    queryset = Record.objects.all()
    serializer_class = RecordSerializer


class DebtViewSet(viewsets.ModelViewSet):
    queryset = Debt.objects.all()
    serializer_class = DebtSerializer


class AgreementViewSet(viewsets.ModelViewSet):
    queryset = Agreement.objects.all()
    serializer_class = AgreementSerializer


class NeighborhoodByManagerViewSet(viewsets.ReadOnlyModelViewSet):
    serializer_class = NeighborhoodSerializer

    def get_queryset(self):
        user_id = self.kwargs.get('user_id')
        return Neighborhood.objects.filter(admin=user_id) | Neighborhood.objects.filter(president=user_id)
