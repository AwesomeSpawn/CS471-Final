from django.shortcuts import render
from .serializers import PartSerializer, UsedBikeSerializer
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.views import APIView
from .models import Parts
# from .permissions import HasAPIKey

# Create your views here.


class CreatePart(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = PartSerializer(data=request.data)
        if serializer.is_valid(raise_exception=True):
            part = serializer.create(request.data)
            if part:
                return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class UpdatePartQuantity(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        part = Parts.objects.get(product_id=request.data['product_id'])
        part.quantity = part.quantity + int(request.data['change'])

        if part:
            part.save()
            return Response(status=status.HTTP_201_CREATED)

        return Response(status=status.HTTP_400_BAD_REQUEST)


class GetUsedBikes(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        items = Parts.objects.filter(sale__isnull=False)
        serializer = UsedBikeSerializer(items, many=True)
        return Response(serializer.data)


"""
class InventoryListView(views.APIView):
    #permission_classes = [HasAPIKey]

    def get(self, request):
        items = InventoryItem.objects.all()
        serializer = InventoryItemSerializer(items, many=True)
        return Response(serializer.data)
"""
