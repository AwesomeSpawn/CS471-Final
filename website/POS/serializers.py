from rest_framework import serializers
from .models import POS

class POSSerializers(serializers.ModelSerializer):
    class Meta:
        model = POS
        fields = ['', '']