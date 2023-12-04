from django.shortcuts import render
from .serializers import CreatePartSerializer
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.views import APIView
from rest_framework import views
from .serializers import InventoryItemSerializer
from .models import InventoryItem
from rest_framework.decorators import permission_classes
from rest_framework import permissions


# Create your views here.
class CreatePart(APIView):
    # permission_classes = (permissions.AllowAny,)

    def post(self, request):
        serializer = CreatePartSerializer
        if serializer.is_valid(raise_exception=True):
            part = serializer.create(request)
            if part:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UpdatePartQuantity:
    pass

@permission_classes([permissions.AllowAny])
class InventoryListView(views.APIView):

    def get(self, request):
        items = InventoryItem.objects.all()
        serializer = InventoryItemSerializer(items, many=True)
        return Response(serializer.data)
