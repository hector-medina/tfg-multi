from rest_framework import viewsets
from rest_framework.response import Response


from .serializers import NotificationsSerializer, NotificationsByUserSerializer
from .models import Notifications


class NotificationsViewSet(viewsets.ModelViewSet):
    queryset = Notifications.objects.all()
    serializer_class = NotificationsSerializer


class NotificationsByUserViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Notifications.objects.all()
    serializer_class = NotificationsByUserSerializer

    def list(self, request, *args, **kwargs):
        user_id = kwargs.get('user_id')
        notifications = Notifications.objects.filter(
            neighborhood__admin=user_id
        ) | Notifications.objects.filter(
            neighborhood__president=user_id
        ) | Notifications.objects.filter(
            neighborhood__properties__owner=user_id
        ).order_by('-creation_date')

        serializer = self.get_serializer(notifications.distinct(), many=True)
        return Response(serializer.data)