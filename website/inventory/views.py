from django.shortcuts import render
from .serializers import PartSerializer
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework import views
from .serializers import InventoryItemSerializer
from .models import InventoryItem, Parts
#from .permissions import HasAPIKey

# Create your views here.
class CreatePart(APIView):
    # permission_classes = (permissions.AllowAny,)
    def post(self, request):
        serializer = PartSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            part = serializer.create(request.data)
            if part:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UpdatePartQuantityByOne:
    def post(self, request):
        part = Parts.objects.get(product_id=request.data['product_id'])
        part.quantity = part.quantity + 1
        part.save()
        if part:
            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class InventoryListView(views.APIView):
    #permission_classes = [HasAPIKey]

    def get(self, request):
        items = InventoryItem.objects.all()
        serializer = InventoryItemSerializer(items, many=True)
        return Response(serializer.data)
