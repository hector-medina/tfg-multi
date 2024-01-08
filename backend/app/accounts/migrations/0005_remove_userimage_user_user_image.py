# Generated by Django 4.2.7 on 2024-01-07 16:45

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('accounts', '0004_remove_user_profileimage_userimage'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='userimage',
            name='user',
        ),
        migrations.AddField(
            model_name='user',
            name='image',
            field=models.ForeignKey(blank=True, default=None, null=True, on_delete=django.db.models.deletion.SET_NULL, to='accounts.userimage'),
        ),
    ]
