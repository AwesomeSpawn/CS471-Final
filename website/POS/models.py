from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator

class Sale(models.Model):
    id = models.IntegerField(primary_key=True)
    cost = models.FloatField()
    credit_card = models.IntegerField(max_length=16)
    CVC = models.IntegerField(max_length=3)
    validMonth = models.IntegerField(MaxValueValidator(12), MinValueValidator(1))
    ValidDay = models.IntegerField(MaxValueValidator(31), MinValueValidator(1))
    nameOnCard = models.CharField(max_length=50)