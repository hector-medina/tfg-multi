# Generated by Django 4.2.7 on 2024-01-09 06:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('communities', '0007_agreement_creation_date'),
    ]

    operations = [
        migrations.RenameField(
            model_name='agreement',
            old_name='archivo_pdf',
            new_name='pdf_file',
        ),
    ]
