from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Posicion
from .serializers import PosicionSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from .models import Posicion

class PosicionBulkView(APIView):
    def post(self, request):
        serializer = PosicionSerializer(data=request.data, many=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class PosicionListView(APIView):
    def get(self, request):
        posiciones = Posicion.objects.order_by('id')[:800]

        serializer = PosicionSerializer(posiciones, many=True)
        return Response(serializer.data)




class ReiniciarPistaView(APIView):
    def delete(self, request):
        Posicion.objects.all().delete()
        return Response({"message": "✅ Todas las coordenadas fueron eliminadas."}, status=status.HTTP_200_OK)
