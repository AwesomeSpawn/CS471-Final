# Generated by Django 4.2.7 on 2023-12-04 18:26

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('POS', '0001_initial'),
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
        ('jobs', '0006_alter_jobs_assignee_alter_jobs_sale'),
    ]

    operations = [
        migrations.AlterField(
            model_name='jobs',
            name='assignee',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.PROTECT, to=settings.AUTH_USER_MODEL),
        ),
        migrations.AlterField(
            model_name='jobs',
            name='sale',
            field=models.ForeignKey(null=True, on_delete=models.SET(0), to='POS.sale'),
        ),
    ]