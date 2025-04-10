from django.urls import path
from .views import PressureReceiverView, PressureListView

urlpatterns = [
    path('receive/', PressureReceiverView.as_view(), name='receive_pressure'),
    path('readings/', PressureListView.as_view(), name='pressure_readings'),
]
