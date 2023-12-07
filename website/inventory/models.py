from django.db import models



class Product(models.Model):
    product_id = models.AutoField(primary_key=True)
    product_name = models.CharField(max_length=100)
    cost = models.FloatField()


class UsedBikes(Product):
    vehicle_id = models.AutoField(primary_key=True)
    license_plate = models.CharField(max_length=20)
    vin = models.CharField(max_length=30)
    make = models.CharField(max_length=100)
    vehicle_model = models.CharField(max_length=100)
    year = models.IntegerField()
    sale = models.ForeignKey('POS.Sale', on_delete=models.SET(
        0), default=0, related_name='used_bikes')


class Parts(Product):
    serial_number = models.IntegerField()
    quantity_extra = models.IntegerField(default=0)
    curr_amount_needed = models.IntegerField(default=0)
    sale = models.ForeignKey('POS.Sale', on_delete=models.SET(
        0), default=None, null=True, related_name='parts')
