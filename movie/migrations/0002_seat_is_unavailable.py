# Generated by Django 5.2.4 on 2025-07-11 19:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('movie', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='seat',
            name='is_unavailable',
            field=models.BooleanField(default=False),
        ),
    ]
