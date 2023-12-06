from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import permission_classes
from inventory.models import Parts
from .models import Jobs
from login.models import AppUser
from django.views.decorators.http import require_http_methods
import json
from django.views.decorators.csrf import csrf_exempt
from django.db import transaction
from rest_framework import permissions


@require_http_methods(["GET"])
def get_jobs(request):
    jobs = Jobs.objects.all()

    jobs_data = []
    for job in jobs:
        job_data = {
            'job_id': job.job_id,
            'job_time': job.job_time,
            'assignee_id': job.assignee_id if job.assignee else None,
            'task_str': job.task_str,
            # TO BE ADDEd 'job_parts': list(job.job_parts.values_list('id', flat=True)),
        }
        jobs_data.append(job_data)

    return JsonResponse(jobs_data, safe=False)


@permission_classes([permissions.AllowAny])
@require_http_methods(["POST"])
def assign_job(request):
    data = json.loads(request.body)
    job = Jobs.objects.get(job_id=data['job_id'])
    employee = AppUser.objects.get(user_id=data['employee_id'])
    job.assignee = employee
    job.save()
    return JsonResponse({"message": "Job assigned successfully!"})


@csrf_exempt
@require_http_methods(["POST"])
def create_job(request):
    try:
        data = json.loads(request.body)

        required_fields = ['task_str', 'job_time', 'assignee']
        if not all(field in data for field in required_fields):
            return JsonResponse({'error': 'Missing required fields'}, status=400)

        optional_fields = {'job_parts': list}
        for field, expected_type in optional_fields.items():
            if field in data and not isinstance(data[field], expected_type):
                return JsonResponse({'error': f'Invalid type for {field}'}, status=400)

        with transaction.atomic():

            new_job = Jobs(
                task_str=data['task_str'],
                job_time=data['job_time']
            )

            try:
                assignee = AppUser.objects.get(pk=data['assignee'])
                new_job.assignee = assignee
            except AppUser.DoesNotExist:
                return JsonResponse({'error': 'Assignee not found'}, status=404)

            new_job.save()

            return JsonResponse({'message': 'Job created successfully!'})
    except json.JSONDecodeError:
        return JsonResponse({'error': 'Invalid JSON'}, status=400)
    except Exception as e:
        return JsonResponse({'error': str(e)}, status=500)


@permission_classes([permissions.AllowAny])
@require_http_methods(["POST"])
def update_job_time(request):
    data = json.loads(request.body)
    try:
        job = Jobs.objects.get(job_id=data['job_id'])
        job.time_spent = data['time_spent']
        job.save()
        return JsonResponse({"message": "Job time updated successfully!"})
    except Jobs.DoesNotExist:
        return JsonResponse({'error': 'Job not found'}, status=404)
    except KeyError:
        return JsonResponse({'error': 'Missing job_id or time_spent'}, status=400)


@permission_classes([permissions.AllowAny])
@require_http_methods(["POST"])
def update_job_completion(request):
    data = json.loads(request.body)
    try:
        job = Jobs.objects.get(job_id=data['job_id'])
        completed = data['completed']
        job.completed = completed
        job.save()
        return JsonResponse({"message": "Job completion status updated successfully!"})
    except Jobs.DoesNotExist:
        return JsonResponse({'error': 'Job not found'}, status=404)
    except KeyError:
        return JsonResponse({'error': 'Missing job_id or completed field'}, status=400)
