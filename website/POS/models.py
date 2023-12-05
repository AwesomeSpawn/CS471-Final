from django.db import models
from django.core.validators import MaxValueValidator, MinValueValidator, RegexValidator

class Sale(models.Model):
    id = models.AutoField(primary_key=True)
    cost = models.FloatField()
    credit_card = models.CharField(default='0000000000000000', max_length=16, validators=[RegexValidator(regex=r'^[0-9]+$', message='Only numeric characters are allowed.')])
    CVC = models.CharField(default='000', max_length=3, validators=[RegexValidator(regex=r'^[0-9]+$', message='Only numeric characters are allowed.')])
    nameOnCard = models.CharField(default='John Doe', max_length=50)
    validMonth = models.PositiveBigIntegerField(default='1', validators=[MaxValueValidator(12)])
    ValidDay = models.PositiveBigIntegerField(default='1', validators=[MaxValueValidator(31)])
