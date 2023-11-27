from .models import Parts
from rest_framework import serializers
from django.contrib.auth import get_user_model, authenticate

class CreatePartSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        part_obj = Parts.objects.create(product_name=validated_data['name'],
                                        serial_number=validated_data['serial_number'],
                                        quantity=validated_data['quantity'])
        part_obj.save()
        return part_obj
