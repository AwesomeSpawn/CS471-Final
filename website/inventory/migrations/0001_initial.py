# Generated by Django 4.2.7 on 2023-11-28 23:31

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        ('POS', '0001_initial'),
    ]

    operations = [
        migrations.CreateModel(
            name='Product',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('product_id', models.IntegerField()),
                ('product_name', models.CharField(max_length=100)),
                ('cost', models.FloatField()),
            ],
        ),
        migrations.CreateModel(
            name='Parts',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='inventory.product')),
                ('serial_number', models.IntegerField()),
                ('quantity', models.IntegerField()),
                ('curr_amount_needed', models.IntegerField(default=0)),
            ],
            bases=('inventory.product',),
        ),
        migrations.CreateModel(
            name='UsedBikes',
            fields=[
                ('product_ptr', models.OneToOneField(auto_created=True, on_delete=django.db.models.deletion.CASCADE, parent_link=True, primary_key=True, serialize=False, to='inventory.product')),
                ('vehicle_id', models.IntegerField()),
                ('license_plate', models.CharField(max_length=20)),
                ('vin', models.CharField(max_length=30)),
                ('make', models.CharField(max_length=100)),
                ('vehicle_model', models.CharField(max_length=100)),
                ('year', models.IntegerField()),
                ('sale', models.ForeignKey(default=0, on_delete=models.SET(0), to='POS.sale')),
            ],
            bases=('inventory.product',),
        ),
    ]
