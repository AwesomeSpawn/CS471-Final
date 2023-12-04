from .models import Jobs
from rest_framework import serializers

class JobSerializer(serializers.ModelSerializer):
    class Meta:
        model = Jobs
        fields = '__all__'
    
    def create(self, validated_data):
        my_job = Jobs.objects.create(job_id=validated_data['job_id'], job_time=0,
                                     assignee=0, task_str=validated_data['task_str']
                                     , sale=0)
        my_job.save()
        return my_job