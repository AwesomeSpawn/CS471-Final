from django.shortcuts import render
from .serializers import CreatePartSerializer
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.views import APIView

# Create your views here.
class CreatePart(APIView):
    permission_classes = (permissions.AllowAny,)
    def post(self, request):
        serializer = CreatePartSerializer
        if serializer.is_valid(raise_exception=True):
            part = serializer.create(request)
            if part:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UpdatePartQuantity:
    pass
