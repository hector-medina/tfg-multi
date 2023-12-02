from django.test import TestCase
from ..models import User


class UserTest(TestCase):
    """ Test module for User model """

    def setUp(self):
        User.objects.create(username='usuario1', password='password1', email='usuario1@example.com')
        User.objects.create(username='usuario2', password='password2', email='usuario2@example.com')

        user_1 = User.objects.get(username='usuario1')
        user_1.dni = '12345678A'
        user_1.save()

        user_2 = User.objects.get(username='usuario2')
        user_2.dni = '87654321Z'
        user_2.save()

    def test_user_email(self):
        user_1 = User.objects.get(username='usuario1')
        user_2 = User.objects.get(username='usuario2')
        self.assertEqual(user_1.get_email(), "usuario1@example.com")
        self.assertEqual(user_2.get_email(), "usuario2@example.com")

    def test_user_dni(self):
        user_1 = User.objects.get(username='usuario1')
        user_2 = User.objects.get(username='usuario2')
        self.assertEqual(user_1.get_dni(), '12.345.678-A')
        self.assertEqual(user_2.get_dni(), '87.654.321-Z')
