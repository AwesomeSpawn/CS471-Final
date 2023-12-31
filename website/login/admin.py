from django.contrib import admin
from .models import AppUser

class UserAdmin(admin.ModelAdmin):
    list_display = ('user_id', 'employee', 'admin')

# Register your models here.

admin.site.register(AppUser, UserAdmin)