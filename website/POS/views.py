from django.http import JsonResponse
from .models import Sale
from .serializers import POSSerializers
from django.shortcuts import render
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response 
from rest_framework import status, permissions

# Create your views here.
@api_view(['GET'])
@permission_classes([permissions.AllowAny])
def POSList(request):
    if request.method == 'GET':
        sales = Sale.objects.all()
        serializer = POSSerializers(data=sales, many=True)
        if serializer.is_valid():
            return Response(serializer.data, status=status.HTTP_200_OK)
        else:
            print(serializer.errors)
            return Response(status=status.HTTP_500_INTERNAL_SERVER_ERROR)
    #if request.method == 'POST':
        