# Generated by Django 4.2.7 on 2023-11-28 23:31

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Jobs',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('job_id', models.IntegerField()),
                ('job_time', models.IntegerField()),
                ('task_str', models.CharField(max_length=5000)),
            ],
        ),
    ]
