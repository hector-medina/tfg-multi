from rest_framework import serializers

from .models import Notifications
from communities.models import Neighborhood

class NeighborhoodNotificationsSerializer(serializers.ModelSerializer):
    class Meta:
        model = Neighborhood
        fields = ('id', 'name', 'admin', 'president',)


class NotificationsByUserSerializer(serializers.ModelSerializer):

    neighborhood = NeighborhoodNotificationsSerializer(read_only=True)

    class Meta:
        model = Notifications
        fields = ('id', 'title', 'description', 'creation_date', 'neighborhood',)


class NotificationsSerializer(serializers.ModelSerializer):

    class Meta:
        model = Notifications
        fields = ('id', 'title', 'description', 'creation_date', 'neighborhood',)

