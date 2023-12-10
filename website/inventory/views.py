from django.shortcuts import render
from .serializers import PartSerializer, UsedBikeSerializer, ProductSerializer
from rest_framework.response import Response
from rest_framework import permissions, status
from rest_framework.views import APIView
from .models import Parts, Product, UsedBikes

# Create your views here.


class CreatePart(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):

        # Extract product related data
        product_data = {
            'product_name': request.data.get('product_name'),
            'cost': request.data.get('cost')
        }

        # Create Product instance
        product = Product.objects.create(**product_data)

        # Get the corresponding POS Sale instance
        sale = request.data.get('sale')

        # Update request data with product_ptr_id and sale_id
        part_data = request.data
        part_data['product_ptr'] = product.product_id
        part_data['sale'] = sale

        # Create Part instance using the serializer
        serializer = PartSerializer(data=part_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class CreateUsedBike(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        # Extract product related data
        product_data = {
            'product_name': request.data.get('product_name'),
            'cost': request.data.get('cost')
        }

        # Create Product instance
        product = Product.objects.create(**product_data)

        # Get the corresponding POS Sale instance
        sale = request.data.get('sale')

        # Update request data with product_ptr_id and sale_id
        used_bike_data = request.data
        used_bike_data['product_ptr'] = product.product_id
        used_bike_data['sale'] = sale

        # Create UsedBike instance using the serializer
        serializer = UsedBikeSerializer(data=used_bike_data)
        if serializer.is_valid(raise_exception=True):
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


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
        # Querying UsedBikes instead of Parts
        used_bikes = UsedBikes.objects.filter(sale__isnull=False)
        serializer = UsedBikeSerializer(used_bikes, many=True)
        return Response(serializer.data)


class GetParts(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        parts = Parts.objects.all()
        serializer = PartSerializer(parts, many=True)
        return Response(serializer.data)


class GetProducts(APIView):
    permission_classes = (permissions.AllowAny,)

    def get(self, request):
        products = Product.objects.all()
        serializer = ProductSerializer(products, many=True)
        return Response(serializer.data)
