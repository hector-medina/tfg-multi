from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status


from .serializers import NeighborhoodSerializer, BankAccountSerializer
from .models import Neighborhood, BankAccount


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
