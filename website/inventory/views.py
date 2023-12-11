from django.db.models import Q
from django.shortcuts import get_object_or_404, redirect
from .models import Product, UsedBikes, Parts
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
        part_data['sale'] = sale if sale else None

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


class SellProductView(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        product_id = request.data.get('product_id')
        quantity = request.data.get('quantity')

        if not product_id:
            return Response({"error": "product_id is required"}, status=status.HTTP_400_BAD_REQUEST)

        if not quantity:
            return Response({"error": "quantity is required"}, status=status.HTTP_400_BAD_REQUEST)

        product = get_object_or_404(Product, pk=product_id)

        # Check if the product is a part
        if Parts.objects.filter(product_ptr_id=product_id).exists():
            # If there are extras, decrement the quantity_extra
            part = Parts.objects.get(product_ptr_id=product_id)
            if part.quantity_extra >= quantity:
                part.quantity_extra -= quantity
                part.save()
            else:
                return Response({"error": "Part is out of stock"}, status=status.HTTP_400_BAD_REQUEST)
            serializer = PartSerializer(part)
        # Check if the product is a used bike
        elif UsedBikes.objects.filter(product_ptr_id=product_id).exists():
            # Rename the product to "SOLD"
            used_bike = UsedBikes.objects.get(product_ptr_id=product_id)
            used_bike.product_name = "SOLD"
            used_bike.save()
            serializer = UsedBikeSerializer(used_bike)
        else:
            return Response({"error": "Invalid product type"}, status=status.HTTP_400_BAD_REQUEST)

        return Response(serializer.data, status=status.HTTP_201_CREATED)
