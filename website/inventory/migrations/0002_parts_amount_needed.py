# Generated by Django 4.2.7 on 2023-11-25 05:48

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('inventory', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='parts',
            name='amount_needed',
            field=models.IntegerField(default=0),
        ),
    ]