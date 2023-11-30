from django.db import models

class Product(models.Model):
    product_id = models.IntegerField()
    product_name = models.CharField(max_length=100)
    cost = models.FloatField()

class UsedBikes(Product):
    vehicle_id = models.IntegerField()
    license_plate = models.CharField(max_length=20)
    vin = models.CharField(max_length=30)
    make = models.CharField(max_length=100)
    vehicle_model = models.CharField(max_length=100)
    year = models.IntegerField()
    sale = models.ForeignKey('POS.Sale', on_delete=models.SET(0), default=0)

class Parts(Product):
    serial_number = models.IntegerField()
    quantity = models.IntegerField()
    curr_amount_needed = models.IntegerField(default=0)
    open_jobs = models.ManyToManyField('jobs.Jobs', default=None)
    sale = models.ForeignKey('POS.Sale', on_delete=models.SET(0), default=None, null=True)
