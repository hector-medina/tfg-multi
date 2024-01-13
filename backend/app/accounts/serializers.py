from .models import User, UserImage
from rest_framework import serializers
from django.db.transaction import atomic
from django.contrib.auth import get_user_model

from communities.serializers import NeighborhoodSerializer
from properties.serializers import PropertySerializer
from communities.models import Neighborhood
from chats.serializers import ChatSerializer


class UserImageSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserImage
        fields = ('id', 'image',)


class UserSerializer(serializers.ModelSerializer):

    communities = serializers.SerializerMethodField()
    properties = serializers.SerializerMethodField()
    chats = ChatSerializer(many=True, read_only=True)

    class Meta:
        model = User
        fields = ('id',
                  'first_name',
                  'last_name',
                  'username',
                  'email',
                  'dni',
                  'phone',
                  'address',
                  'communities',
                  'properties',
                  'image',
                  'chats')
    
    def get_communities(self, user):
        communities_admin = user.communities_admin.all()
        communities_president = user.communities_president.all()        
        communities_owner = Neighborhood.objects.filter(properties__in=user.owned.all())
        communities = communities_admin | communities_president | communities_owner
        return NeighborhoodSerializer(communities.distinct(), many=True).data

    def get_properties(self, user):
        properties = user.owned.all()
        return PropertySerializer(properties, many=True).data


def must_be_true(value):
    if not value:
        raise serializers.ValidationError("You must accept the terms to register")


def not_empty(value):
    if not value:
        raise serializers.ValidationError("This field cannot be empty")


def not_shorter_than_10(value):
    if len(value) < 10:
        raise serializers.ValidationError("This field must be at least 10 characters long")


class RegisterSerializer(serializers.ModelSerializer):

    class Meta:
        model = get_user_model()
        fields = ('username', 'email', 'password', 'acceptsPrivacyPolicy')

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

    def validate(self, data):
        """
        Check if the username is unique and raise a validation error if not.
        """
        username = data.get('username')

        # Check if username is unique
        if username and get_user_model().objects.filter(username=username).exists():
            raise serializers.ValidationError({'error': 'User with this username already exists.'})

        return data
