from rest_framework import serializers
from .models import Sale


class POSSerializers(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'
