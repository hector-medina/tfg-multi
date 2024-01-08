from django.db import models
from accounts.models import User
from communities.models import Neighborhood


class Property(models.Model):
    name = models.CharField(max_length=200)
    owner = models.ForeignKey(User, related_name='owned', on_delete=models.CASCADE)
    neighborhood = models.ForeignKey(Neighborhood, null=True, related_name='properties', on_delete=models.CASCADE)
    size = models.FloatField(default=0)
    creation_date = models.DateField(auto_now_add=True)

# Create your models here.
