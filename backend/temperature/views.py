from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import TemperatureReading
from .serializers import TemperatureReadingSerializer

class TemperatureReceiverView(APIView):
    def post(self, request):
        temperature = request.data.get('temperature')
        humidity = request.data.get('humidity')

        if temperature is None or humidity is None:
            return Response(
                {'error': 'Temperature and humidity are required.'},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Limitar a los últimos 30 registros
        if TemperatureReading.objects.count() >= 30:
            oldest = TemperatureReading.objects.earliest('timestamp')
            oldest.delete()

        # Guardar nuevo registro
        TemperatureReading.objects.create(
            temperature=temperature,
            humidity=humidity
        )

        return Response(
            {'message': 'Temperature and humidity saved successfully.'},
            status=status.HTTP_201_CREATED
        )


class TemperatureListView(APIView):
    def get(self, request):
        readings = TemperatureReading.objects.order_by('-timestamp')[:30]
        readings = reversed(readings)  # Del más antiguo al más nuevo
        serializer = TemperatureReadingSerializer(readings, many=True)
        return Response(serializer.data)
