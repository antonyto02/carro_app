from rest_framework import serializers
from .models import Posicion

class PosicionSerializer(serializers.ModelSerializer):
    class Meta:
        model = Posicion
        fields = '__all__'
