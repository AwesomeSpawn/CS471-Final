from django.db import models

class Jobs(models.Model):
    job_id = models.AutoField(primary_key=True)
    job_time = models.IntegerField(default=0)
    assignee = models.ForeignKey('login.AppUser', on_delete=models.PROTECT, null=True)
    task_str = models.CharField(max_length=5000)
    sale = models.ForeignKey('POS.Sale', on_delete=models.SET(0), null=True)
    completed = models.BooleanField(default=False)