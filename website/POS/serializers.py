from rest_framework import serializers
from .models import Sale

class POSSerializers(serializers.ModelSerializer):
    class Meta:
        model = Sale
        fields = '__all__'
    
    def create(self, data):
        my_sale = Sale.objects.create(cost=data['cost'], credit_card=data['credit_card'],
                                      CVC=data['CVC'], card_name=data['card_name'],
                                      valid_month=data['valid_month'], valid_dat=data['valid_day'])
        my_sale.save()
        return my_sale