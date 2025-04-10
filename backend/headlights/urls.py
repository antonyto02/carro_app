from django.urls import path
from .views import controlar_luces

urlpatterns = [
    path('api/control-luces/', controlar_luces, name='controlar_luces'),
]
