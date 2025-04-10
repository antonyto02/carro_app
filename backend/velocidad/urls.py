from django.urls import path
from .views import controlar_velocidad

urlpatterns = [
    path('control-velocidad/', controlar_velocidad, name='controlar_velocidad'),
]
