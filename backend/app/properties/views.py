from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated


from .serializers import PropertySerializer
from .models import Property


class PropertyViewSet(viewsets.ModelViewSet):
    queryset = Property.objects.all()
    serializer_class = PropertySerializer
    # permission_classes = [IsAuthenticated]


