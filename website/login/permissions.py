# login/permissions.py

from rest_framework import permissions
from django.conf import settings


class HasAPIKey(permissions.BasePermission):
    """
    Custom permission to check for an API key.
    """

    def has_permission(self, request, view):
        api_key = request.headers.get('X-API-KEY')
        return api_key == settings.MY_API_KEY
