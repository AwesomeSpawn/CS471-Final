from django.shortcuts import render
from django.http import JsonResponse
from .models import Jobs
from login.models import AppUser
from django.views.decorators.http import require_http_methods
import json


@require_http_methods(["GET"])
def get_jobs(request):
    # Define the fields to be retrieved
    fields = ['id']

    # Retrieve all Jobs objects, selecting only the specified fields
    jobs = Jobs.objects.all().values(*fields)

    # Return the jobs as a JSON response
    return JsonResponse(list(jobs), safe=False)


# Endpoint to assign a job


@require_http_methods(["POST"])
def assign_job(request):
    data = json.loads(request.body)
    job = Jobs.objects.get(job_id=data['job_id'])
    employee = AppUser.objects.get(user_id=data['employee_id'])
    job.assignee = employee
    job.save()
    return JsonResponse({"message": "Job assigned successfully!"})

# Endpoint to create a job


@require_http_methods(["POST"])
def create_job(request):
    data = json.loads(request.body)
    new_job = Jobs.objects.create(task_str=data['task_str'])
    return JsonResponse({"job_id": new_job.job_id, "task_str": new_job.task_str})
