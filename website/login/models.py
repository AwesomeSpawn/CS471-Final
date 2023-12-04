from django.db import models
from django.contrib.auth.base_user import BaseUserManager
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
# Create your models here.
"""
class User(models.Model):
    user_id = models.IntegerField()
    password = models.TextField(max_length=50)
    token = models.TextField(max_length=40)
    employee = models.BooleanField(default=True)
    admin = models.BooleanField(default=False)
    first_name = models.TextField(max_length=20, default="")
    last_name = models.TextField(max_length=20, default="")
"""


class AppUserManager(BaseUserManager):
    def create_user(self, email, password=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        email = self.normalize_email(email)
        user = self.model(email=email)
        user.set_password(password)
        user.save()
        return user

    def create_superuser(self, email, username, password=None):
        if not email:
            raise ValueError('An email is required.')
        if not password:
            raise ValueError('A password is required.')
        user = self.create_user(email, password)
        user.username = username
        user.is_superuser = True
        user.save()
        return user


class AppUser(AbstractBaseUser, PermissionsMixin):
    user_id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=50, unique=True)
    username = models.CharField(max_length=50)
    token = models.TextField(max_length=40)
    employee = models.BooleanField(default=True)
    admin = models.BooleanField(default=False)
    first_name = models.TextField(max_length=20, default="")
    last_name = models.TextField(max_length=20, default="")
    role = models.TextField(max_length=20, default="")
    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['username']
    objects = AppUserManager()

    def __str__(self):
        return self.username

    def is_staff(self):
        return self.is_superuser
