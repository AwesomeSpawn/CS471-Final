from rest_framework import serializers
from django.contrib.auth import get_user_model
import datetime

Timesheet = get_user_model()

class TimesheetSerializer(serializers.ModelSerializer):
    class Meta:
        model = Timesheet
        fields = '__all__'

    def create(self, clean_data):
        timesheet = Timesheet.objects.create(hours=clean_data['hours'],
                                                start_date=datetime(clean_data['start_date']),
                                                employee_id=clean_data['employee_id'])
        timesheet.save()
        return timesheet