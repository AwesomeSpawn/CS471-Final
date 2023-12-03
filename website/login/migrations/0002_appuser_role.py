# Generated by Django 4.2.7 on 2023-12-03 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('login', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='appuser',
            name='role',
            field=models.CharField(choices=[('technician', 'Technician'), ('manager', 'Manager'), ('cashier', 'Cashier'), ('admin', 'Admin')], default='technician', max_length=30),
        ),
    ]
