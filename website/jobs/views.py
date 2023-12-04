from django.shortcuts import render
from .serializers import JobSerializer
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.views import APIView
from .models import Jobs
from inventory.models import Parts

class CreateJob(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        ser = JobSerializer(data=request.data)
        if ser.is_valid(raise_exception=True):
            job = ser.create(request.data)
            if job:
                return Response(ser.data, status=status.HTTP_201_CREATED)
            
        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class AssignJob(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        job = Jobs.objects.get(job_id=request.data['job_id'])
        job.assignee = request.data['assignee']
        job.save()

class PartEstablish(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        job = Jobs.objects.get(job_id=request.data['job_id'])
        job.task_str = request.data['task_str']
        for part_info in request.data['parts']:
            part = Parts.objects.get(serial_number=part_info['serial_number'])
            part.quantity_extra -= int(part_info.quantity)
            part.curr_amount_needed += int(part_info.quantity)
            part.save()
        
class SetComplete(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        job = Jobs.objects.get(job_id=request.data['job_id'])
        job.completed = bool(request.data['complete'])
        job.save()