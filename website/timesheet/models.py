from django.db import models

# Create your models here.

class Timesheet(models.Model):
    hours = models.IntegerField()
    start_date = models.DateTimeField()
    employee_id = models.IntegerField()
    timesheet_id = models.IntegerField()