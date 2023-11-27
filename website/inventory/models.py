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

class Parts(Product):
    serial_number = models.IntegerField()
    quantity = models.IntegerField()
    amount_needed = models.IntegerField(default=0)
    related_jobs = models.ManyToManyField('jobs.Jobs')
