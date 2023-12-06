from django.shortcuts import render
from .serializers import CreatePartSerializer, InventoryItemSerializer
from .models import InventoryItem
from rest_framework import views, status, permissions
from rest_framework.response import Response
from rest_framework.decorators import permission_classes

@permission_classes([permissions.AllowAny])
class InventoryListView(views.APIView):
    # GET request handler
    def get(self, request):
        items = InventoryItem.objects.all()
        serializer = InventoryItemSerializer(items, many=True)
        return Response(serializer.data)

    # POST request handler
    # Ensure only authenticated users can post
    @permission_classes([permissions.IsAuthenticated])
    def post(self, request):
        serializer = InventoryItemSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

# Update quantity view


@permission_classes([permissions.AllowAny])
class UpdatePartQuantity(views.APIView):
    @permission_classes([permissions.IsAuthenticated])
    def post(self, request, item_id):
        try:
            item = InventoryItem.objects.get(pk=item_id)
        except InventoryItem.DoesNotExist:
            return Response({'error': 'Item not found'}, status=status.HTTP_404_NOT_FOUND)

        serializer = InventoryItemSerializer(
            item, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_200_OK)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
