# Generated by Django 4.2.7 on 2023-11-30 02:26

from django.db import migrations, models


class Migration(migrations.Migration):

    initial = True

    dependencies = [
    ]

    operations = [
        migrations.CreateModel(
            name='Timesheet',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('hours', models.IntegerField()),
                ('start_date', models.DateTimeField()),
                ('employee_id', models.IntegerField()),
                ('timesheet_id', models.IntegerField()),
            ],
        ),
    ]
