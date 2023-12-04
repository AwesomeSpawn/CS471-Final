from django.db import models

class Jobs(models.Model):
    job_id = models.IntegerField(primary_key=True)
    job_time = models.IntegerField()
    assignee = models.ForeignKey('login.AppUser', on_delete=models.PROTECT)
    task_str = models.CharField(max_length=5000)
    sale = models.ForeignKey('POS.Sale', on_delete=models.SET(0))
    completed = models.BooleanField(default=False)