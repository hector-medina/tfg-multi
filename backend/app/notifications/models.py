from django.db import models
from django.utils import timezone

from communities.models import Neighborhood

class Notifications(models.Model):
    title = models.CharField(max_length=255)
    description = models.TextField()
    creation_date = models.DateTimeField(default=timezone.now, blank=True, null=True)
    neighborhood = models.ForeignKey(Neighborhood, on_delete=models.CASCADE, related_name='notifications')
