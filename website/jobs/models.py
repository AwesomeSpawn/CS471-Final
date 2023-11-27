from django.db import models

# Create your models here.
class Jobs(models.Model):
    job_id = models.IntegerField()
    job_time = models.IntegerField()
    assignee = models.ForeignKey('login.AppUser', on_delete=models.PROTECT)
    task_str = models.CharField(max_length=5000)
    job_parts = models.ManyToManyField('inventory.Parts')
