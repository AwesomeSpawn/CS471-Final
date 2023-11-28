from django.http import JsonResponse
from .models import sales
from .serializers import POSSerializer
from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response 
from rest_framework import status

# Create your views here.
@api_view(['GET', 'POST'])
def POSList(request):
    if request.method == 'GET':
        POS = pointOfSales.objects.all()
        return JsonResponse(POS.data)
    
    if request.method == 'POST':
        