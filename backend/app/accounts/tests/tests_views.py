import json
from rest_framework import status
from django.test import TestCase, Client
from django.urls import reverse
from ..models import User
from ..serializers import RegisterSerializer, UserSerializer


# initialize the APIClient app
client = Client()


# I need to add a test for the UserRegistrationAPIView class
# create, update, delete, list and get.
class RegisterUserTest(TestCase):
    """ Test module for GET all puppies API """

    def setUp(self):
        User.objects.create(username='usuario1', password='password1', email='usuario1@example.com')
        User.objects.create(username='usuario2', password='password2', email='usuario2@example.com')

    def test_register_user(self):
        # get API response
        response = client.post(reverse('signup'), data={
            'username': 'usuario3',
            'password': 'password3',
            'email': 'usuario3@example.com'})
        print(response.data)

    def test_get_all_users(self):
        # get API response
        response = client.get(reverse('accounts-list'))
        # get data from db
        puppies = User.objects.all()
        serializer = UserSerializer(puppies, many=True)
        self.assertEqual(response.data, serializer.data)
        self.assertEqual(response.status_code, status.HTTP_200_OK)