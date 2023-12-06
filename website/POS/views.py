from django.http import JsonResponse
from .models import Sale
from .serializers import POSSerializers
from django.shortcuts import render
from django.forms.models import model_to_dict
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response 
from rest_framework import status, permissions

# Create your views here.
@api_view(['GET', 'POST'])
@permission_classes([permissions.AllowAny])
def POSList(request):
    if request.method == 'GET':
        sales = list(map(lambda sale: model_to_dict(sale), Sale.objects.all()))
        #serializer = POSSerializers(data=sales, many=True)
        if sales:
            return Response(sales, status=status.HTTP_200_OK)
            
    if request.method == 'POST':
        ser = POSSerializers(data=request.data)
        if ser.is_valid(raise_exception=True):
            sale = ser.create(request.data)
            if sale:
                return Response(ser.data, status=status.HTTP_201_CREATED)
    return Response(status=status.HTTP_400_BAD_REQUEST)
        