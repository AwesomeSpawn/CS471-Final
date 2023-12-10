from .models import UsedBikes, Product
from .models import Parts, Product, UsedBikes
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate


class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parts
        fields = '__all__'

"""     def create(self, validated_data):
        part_obj = Parts.objects.create(product_name=validated_data['product_name'],
                                        serial_number=validated_data['serial_number'],
                                        quantity_extra=validated_data['quantity'],
                                        cost=validated_data['cost'])
        part_obj.save()
        return part_obj """



class UsedBikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsedBikes
        fields = '__all__'  # Use all fields from the UsedBikes model

"""     def create(self, validated_data):
        # Create and save Product instance separately
        product_data = {
            'product_name': validated_data.pop('product_name', None),
            'cost': validated_data.pop('cost', None)
        }
        product_instance = Product.objects.create(**product_data)

        # Create UsedBike instance linked to the Product instance
        used_bike_instance = UsedBikes.objects.create(
            **validated_data, product_ptr=product_instance)
        return used_bike_instance """


class ProductSerializer(serializers.ModelSerializer):
    class Meta:
        model = Product
        fields = '__all__'
