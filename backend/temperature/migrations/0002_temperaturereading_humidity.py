# Generated by Django 4.2 on 2025-03-22 15:18

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('temperature', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='temperaturereading',
            name='humidity',
            field=models.FloatField(default=50.0),
            preserve_default=False,
        ),
    ]
