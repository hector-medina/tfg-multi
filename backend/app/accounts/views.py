from rest_framework import viewsets, status, generics
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import mixins
from django.urls import reverse
from django.db import IntegrityError
from rest_framework.permissions import IsAuthenticated
from communities.models import Neighborhood
from rest_framework.parsers import MultiPartParser, FormParser 


from .serializers import UserSerializer, RegisterSerializer, UserImageSerializer
from .models import User, UserImage


class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]

class UserImageViewSet(viewsets.ModelViewSet):
    queryset = UserImage.objects.all()
    serializer_class = UserImageSerializer
    permission_classes = [IsAuthenticated]
    parser_classes = [FormParser, MultiPartParser]

class UserRegistrationViewSet(mixins.CreateModelMixin, viewsets.GenericViewSet):
    queryset = User.objects.all()
    serializer_class = RegisterSerializer

    def create(self, request):
        serializer = RegisterSerializer(data=request.data)
        if serializer.is_valid():
            try:
                serializer.save()
                print(serializer.data)
                return Response(serializer.data, status=status.HTTP_201_CREATED)
            except IntegrityError:
                return Response(
                    {"error": "User with this email already exists."}, status=status.HTTP_400_BAD_REQUEST
                )
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
