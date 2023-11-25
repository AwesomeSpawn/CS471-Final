# login/permissions.py

from rest_framework import permissions
from django.conf import settings


class HasAPIKey(permissions.BasePermission):
    def has_permission(self, request, view):
        api_key = request.headers.get('X-API-KEY')
        print("Received API key:", api_key)  # Debugging statement
        print("Expected API key:", settings.MY_API_KEY)  # Debugging statement
        return api_key == settings.MY_API_KEY
