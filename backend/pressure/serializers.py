from rest_framework import serializers
from .models import PressureReading

class PressureReadingSerializer(serializers.ModelSerializer):
    class Meta:
        model = PressureReading
        fields = ['pressure', 'timestamp']
