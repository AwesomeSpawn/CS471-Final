# Generated by Django 4.2.6 on 2023-12-11 21:58

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('POS', '0002_alter_sale_id'),
        ('inventory', '0006_alter_parts_sale_alter_usedbikes_sale'),
    ]

    operations = [
        migrations.AddField(
            model_name='parts',
            name='location',
            field=models.CharField(default='', max_length=25),
        ),
        migrations.AlterField(
            model_name='usedbikes',
            name='sale',
            field=models.ForeignKey(default=0, null=True, on_delete=models.SET(0), related_name='used_bikes', to='POS.sale'),
        ),
    ]