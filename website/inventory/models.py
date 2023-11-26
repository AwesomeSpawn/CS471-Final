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
