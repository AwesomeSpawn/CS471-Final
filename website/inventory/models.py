from django.db import models


class InventoryItem(models.Model):
    item_name = models.CharField(max_length=255)
    item_type = models.CharField(max_length=50)
    item_description = models.TextField(blank=True)
    quantity = models.IntegerField()
    price = models.DecimalField(max_digits=10, decimal_places=2)
    supplier_id = models.IntegerField(null=True, blank=True)
    date_added = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "inventory"

    def __str__(self):
        return self.item_name
class Product(models.Model):
    product_id = models.IntegerField(primary_key=True)
    product_name = models.CharField(max_length=100)
    cost = models.FloatField()

class UsedBikes(Product):
    vehicle_id = models.IntegerField(primary_key=True)
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
