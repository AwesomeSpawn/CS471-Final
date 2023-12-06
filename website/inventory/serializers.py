from .models import Parts
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate


class PartSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parts
        fields = '__all__'

    def create(self, validated_data):
        part_obj = Parts.objects.create(product_name=validated_data['product_name'],
                                        serial_number=validated_data['serial_number'],
                                        quantity_extra=validated_data['quantity'],
                                        cost=validated_data['cost'])
        part_obj.save()
        return part_obj


class UsedBikeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Parts
        fields = '__all__'
