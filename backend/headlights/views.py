from rest_framework.decorators import api_view
from rest_framework.response import Response
import requests

ESP32_IP = "http://192.168.8.4"  # Cámbialo por la IP real de tu ESP32

@api_view(['POST'])
def controlar_luces(request):
    led = request.data.get('led')        # Ej: 'intermitente_izquierda'
    accion = request.data.get('accion')  # Ej: 'on' o 'off'

    # Mapeo entre nombre lógico y endpoint real del ESP32
    endpoints = {
        'intermitente_izquierda': 'led1',
        'intermitente_derecha': 'led2',
        'altas': 'led3',
        'bajas': 'led4',
        'intermitentes': 'intermitentes',
        'claxon': 'claxon'
    }

    if led not in endpoints or accion not in ['on', 'off']:
        return Response({'error': 'Parámetros inválidos'}, status=400)

    try:
        url = f"{ESP32_IP}/{endpoints[led]}/{accion}"
        r = requests.get(url)
        return Response({'mensaje': f'{led} {accion}', 'respuesta': r.text})
    except Exception as e:
        return Response({'error': 'ESP32 no responde', 'detalles': str(e)}, status=500)

