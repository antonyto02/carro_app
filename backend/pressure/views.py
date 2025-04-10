from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import PressureReading
from .serializers import PressureReadingSerializer

class PressureReceiverView(APIView):
    def post(self, request):
        pressure = request.data.get('pressure')

        if pressure is None:
            return Response({'error': 'Pressure is required.'}, status=status.HTTP_400_BAD_REQUEST)

        # Limitar a 30 registros
        if PressureReading.objects.count() >= 30:
            oldest = PressureReading.objects.earliest('timestamp')
            oldest.delete()

        # Guardar nuevo registro
        PressureReading.objects.create(pressure=pressure)

        return Response({'message': 'Pressure saved successfully.'}, status=status.HTTP_201_CREATED)


class PressureListView(APIView):
    def get(self, request):
        readings = PressureReading.objects.order_by('-timestamp')[:30]
        readings = reversed(readings)  # Del más antiguo al más reciente
        serializer = PressureReadingSerializer(readings, many=True)
        return Response(serializer.data)
