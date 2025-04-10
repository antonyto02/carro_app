from django.db import models

class Posicion(models.Model):
    x = models.FloatField()
    y = models.FloatField()
    angle = models.FloatField()
    timestamp = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"({self.x}, {self.y}) @ {self.angle}°"

