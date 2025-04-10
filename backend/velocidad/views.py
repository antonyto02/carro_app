from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

ESP32_IP = "http://192.168.1.107"  # Cambia esto si tu ESP32 tiene otra IP

@api_view(['POST'])
def controlar_velocidad(request):
    valor = request.data.get('valor')

    try:
        valor_int = int(valor)
        if valor_int not in [0, 70, 90, 110, 130, 150, 170, 190, 210]:
            return Response({'error': 'Valor no permitido'}, status=400)
    except:
        return Response({'error': 'Valor inválido'}, status=400)

    try:
        url = f"{ESP32_IP}/velocidad?valor={valor_int}"
        r = requests.get(url)
        return Response({'mensaje': 'Velocidad actualizada', 'respuesta': r.text})
    except Exception as e:
        return Response({'error': 'ESP32 no responde', 'detalles': str(e)}, status=500)
