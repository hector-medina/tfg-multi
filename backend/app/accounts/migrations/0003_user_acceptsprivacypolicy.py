# Generated by Django 4.2.7 on 2023-12-02 09:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0002_user_dni_user_phone'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='acceptsPrivacyPolicy',
            field=models.BooleanField(default=False),
        ),
    ]
