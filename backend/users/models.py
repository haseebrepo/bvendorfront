from email.policy import default
from django.db import models
from django.utils import timezone
from django.utils.translation import gettext_lazy as _
from django.contrib.auth.models import AbstractUser, BaseUserManager

# Create your models here.



class CustomAccountManager(BaseUserManager):

    def create_superuser(self, email, password, **other_fields):

        other_fields.setdefault('is_staff', True)
        other_fields.setdefault('is_superuser', True)
        other_fields.setdefault('is_active', True)

        if other_fields.get('is_staff') is not True:
            raise ValueError(
                'Superuser must be assigned to is_staff=True.')
        if other_fields.get('is_superuser') is not True:
            raise ValueError(
                'Superuser must be assigned to is_superuser=True.')

        return self.create_user(email, password, **other_fields)

    def create_user(self, email, password, **other_fields):

        if not email:
            raise ValueError(_('You must provide an email address'))

        email = self.normalize_email(email)
        user = self.model(email=email,**other_fields)
        user.set_password(password)
        user.save()
        return user



class User(AbstractUser):
    username = None
    LOGIN_TYPES = [
        (0, 'Finance'),
        (1, 'Facebook'),
        (2, 'Google'),
        (3, 'LinkedIn'),
    ]
    password = models.CharField(_('password'), max_length=128, blank=True, null=True)
    email = models.EmailField(_('email address'), unique=True)
    phone_number = models.CharField(max_length=150, blank=True, null=True)
    full_name = models.CharField(max_length=150, blank=True, null=True, default=None)
    auction_dealer_id = models.CharField(max_length=150, blank=True, null=True)
    user_type = models.IntegerField(blank=True, default=0)
    start_date = models.DateTimeField(default=timezone.now)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=False)
    is_verified = models.BooleanField(default=False)
    credit_point = models.IntegerField(blank=True, default=0)
    has_seller_request = models.IntegerField(blank=True, default=0)
    modified_at = models.DateTimeField(default=timezone.now)
    login_type = models.CharField(max_length = 20, default= 0, choices= LOGIN_TYPES)
    access_token = models.CharField(max_length = 400, blank=True, null=True)
    otp_user = models.BooleanField(default=False)
    is_deleted = models.BooleanField(default=False)
    store_name = models.CharField(max_length=200,default=None, null=True, blank=True)
    objects = CustomAccountManager()

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['password', 'user_type']

    # def __str__(self):
    #     return self.user_name