from django.shortcuts import render
# from .serializers import CreatePartSerializer
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.views import APIView
from django.shortcuts import render
from .serializers import TimesheetSerializer

# Create your views here.

class CreateTimesheet(APIView):
    permission_classes = [permissions.AllowAny,]
    def post(self, request):
        serializer = TimesheetSerializer(request.data)
        if serializer.is_valid():
            sheet = serializer.create(request.data)
            if sheet:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.data, status=status.HTTP_400_BAD_REQUEST)
