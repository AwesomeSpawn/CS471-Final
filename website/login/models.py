from django.db import models

# Create your models here.

class User(models.Model):
    user_id = models.IntegerField()
    password = models.TextField(max_length=50)
    token = models.TextField(max_length=40)
    employee = models.BooleanField(default=True)
    admin = models.BooleanField(default=False)
    first_name = models.TextField(max_length=20, default="")
    last_name = models.TextField(max_length=20, default="")


