from .models import Parts, InventoryItem
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate
from .models import InventoryItem


class CreatePartSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        part_obj = Parts.objects.create(product_name=validated_data['name'],
                                        serial_number=validated_data['serial_number'],
                                        quantity=validated_data['quantity'],
                                        cost=validated_data['cost'],
                                        )
        part_obj.save()
        return part_obj

class InventoryItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = InventoryItem
        fields = '__all__'
