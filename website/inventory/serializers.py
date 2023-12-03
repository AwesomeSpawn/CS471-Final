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
                                        quantity=validated_data['quantity'],
                                        product_id=validated_data['product_id'],
                                        cost=validated_data['cost'])
        part_obj.save()
        return part_obj
