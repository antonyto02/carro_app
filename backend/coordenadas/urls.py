from django.urls import path
from .views import PosicionBulkView, PosicionListView, ReiniciarPistaView

urlpatterns = [
    path('bulk/', PosicionBulkView.as_view(), name='posiciones_bulk'),
    path('list/', PosicionListView.as_view(), name='posiciones_list'),
    path('reiniciar/', ReiniciarPistaView.as_view(), name='reiniciar-pista'),
]
