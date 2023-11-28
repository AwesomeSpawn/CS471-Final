from django.db import models

class Sale(models.Model):
    id = models.IntegerField(primary_key=True)
    cost = models.FloatField()
    credit_card = models.IntegerField()
