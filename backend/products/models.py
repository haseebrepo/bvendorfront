from email.policy import default
from django.db import models

# Create your models here.
from users.models import User


# lets us explicitly set upload path and filename
def upload_to(instance, filename):
    return 'images/{filename}'.format(filename=filename)

def upload_video_to(instance, filename):
    return 'videos/{filename}'.format(filename=filename)

class Product(models.Model):
    title = models.CharField(max_length=200, null=False, blank=False)
    description = models.TextField(null=True, blank=True, default=None)
    quantity = models.IntegerField(default=0)
  
    price = models.IntegerField(default=0, null=False, blank=False)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    image_url = models.ImageField(upload_to=upload_to, blank=True, null=True)
    video_url = models.FileField(upload_to=upload_video_to, blank=True, null=True)
