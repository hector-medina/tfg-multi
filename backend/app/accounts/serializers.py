from .models import User
from rest_framework import serializers
from django.db.transaction import atomic


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password')

def must_be_true(value):
    if not value:
        raise serializers.ValidationError("You must accept the terms to register")


def not_empty(value):
    if not value:
        raise serializers.ValidationError("This field cannot be empty")


def not_shorter_than_10(value):
    if len(value) < 10:
        raise serializers.ValidationError("This field must be at least 10 characters long")


class RegisterSerializer(serializers.Serializer):
    username = serializers.CharField(validators=[not_empty])
    email = serializers.EmailField()
    password = serializers.CharField(validators=[not_shorter_than_10])
    acceptsPrivacyPolicy = serializers.BooleanField(validators=[must_be_true])

    def create(self, validated_data):
        with atomic():
            user = User(
                username=validated_data["username"],
                email=validated_data["email"],
            )
            user.set_password(validated_data["password"])
            user.save()

        return user
