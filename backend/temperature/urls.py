from django.urls import path
from .views import TemperatureReceiverView, TemperatureListView

urlpatterns = [
    path('receive/', TemperatureReceiverView.as_view(), name='receive_temperature'),
    path('readings/', TemperatureListView.as_view(), name='temperature_readings'),

]
