from .models import Jobs
from rest_framework import serializers

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jobs
        fields = '__all__'
    
    def create(self, validated_data):
        my_job = Jobs.objects.create(task_str=validated_data['task_str'])
        my_job.save()
        return my_job