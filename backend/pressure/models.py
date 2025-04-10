from django.db import models

class PressureReading(models.Model):
    pressure = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.pressure} hPa at {self.timestamp}"
