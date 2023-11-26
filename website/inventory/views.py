from django.shortcuts import render
from rest_framework import views
from rest_framework.response import Response
from .serializers import InventoryItemSerializer
from .models import InventoryItem
from .permissions import HasAPIKey



class InventoryListView(views.APIView):
    permission_classes = [HasAPIKey]

    def get(self, request):
        items = InventoryItem.objects.all()
        serializer = InventoryItemSerializer(items, many=True)
        return Response(serializer.data)
