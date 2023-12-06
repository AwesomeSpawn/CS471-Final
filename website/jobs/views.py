from django.shortcuts import render
from .serializers import JobSerializer
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.views import APIView
from .models import Jobs
from inventory.models import Parts
from login.models import AppUser
from django.shortcuts import get_object_or_404
from django.core.serializers import serialize

class JobAPI(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        ser = JobSerializer(data=request.data)
        if ser.is_valid(raise_exception=True):
            job = ser.create(request.data)
            if job:
                return Response(ser.data, status=status.HTTP_201_CREATED)
            
        return Response(status=status.HTTP_400_BAD_REQUEST)
        

class GetterJobs(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        if request.data.get('user_id'):
            usr = get_object_or_404(AppUser, user_id=request.data['user_id'])
            if usr:
                j_list = []
                if usr.role == 'manager':
                    j_list = Jobs.objects.all()
                else:
                    j_list = Jobs.objects.filter(assignee=request.data['user_id'])
                return Response(serialize('json', j_list), status=status.HTTP_200_OK)
        elif request.data.get('job_id'):
            this_job = get_object_or_404(Jobs, job_id=request.data['job_id'])
            if this_job:
                ser = JobSerializer(this_job)
                return Response(ser.data, status=status.HTTP_200_OK)

        return Response(status=status.HTTP_400_BAD_REQUEST)
    
class AssignJob(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        job = Jobs.objects.get(job_id=request.data['job_id'])
        job.assignee = AppUser.objects.get(user_id=request.data['assignee'])
        job.save()
        return Response(status=status.HTTP_200_OK)

class PartEstablish(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        job = Jobs.objects.get(job_id=request.data['job_id'])
        if request.data['task_str']:
            job.task_str = request.data['task_str']
            for part_info in request.data['parts']:
                part = get_object_or_404(Parts, serial_number=part_info['serial_number'])
                if part_info['quantity']:
                    part.quantity_extra -= int(part_info['quantity'])
                    part.curr_amount_needed += int(part_info['quantity'])
                part.save()
        job.save()
        return Response(status=status.HTTP_200_OK)
        
class SetComplete(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        job = Jobs.objects.get(job_id=request.data['job_id'])
        job.job_time = int(request.data['hours'])
        job.completed = bool(request.data['complete'])
        job.save()
        return Response(status=status.HTTP_200_OK)