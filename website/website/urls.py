"""
URL configuration for website project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.shortcuts import render
from rest_framework import routers
from login import views
from inventory import views as invV
from POS import views as POSV

# Landing Page View


def landing_page(request):
    return render(request, 'index_page.html')

# Login Page View


def login_page(request):
    return render(request, 'login_page.html')

# Admin Page View


def admin_page(request):
    return render(request, 'admin_page.html')

# Forgot Password Page View


def forgot_password_page(request):
    return render(request, 'forgot_password_page.html')

# Mechanic Page View


def mechanic_page(request):
    return render(request, 'mechanic_page.html')


def service_manager_page(request):
    return render(request, 'service_manager_page.html')


def cashier_page(request):
    return render(request, 'cashier_page.html')


router = routers.DefaultRouter()
router.register(r'logins', views.UserView, 'login')
router.register(r'login-api', views.UserView, 'login')
urlpatterns = [
    path('admin/', admin.site.urls),
    path('', landing_page, name='landing'),
    path('register', views.UserRegister.as_view(), name='register'),
    path('login', views.UserLogin.as_view(), name='login'),
    path('logout', views.UserLogout.as_view(), name='logout'),
    path('user', views.UserView.as_view(), name='user'),
    path('admin/', admin_page, name='admin'),
    path('forgot_password/', forgot_password_page, name='forgot_password'),
    path('mechanic/', mechanic_page, name='mechanic'),
    path('service_manager/', service_manager_page, name='service_manager'),
    path('cashier/', cashier_page, name='cashier'),
    path('api/inventory/create', invV.CreatePart.as_view(), name='inventory_create'),
    path('pos', POSV.POSList, name='POS-system'),
    path('api/inventory/addparts', invV.UpdatePartQuantity.as_view(), name='add_inventory')


    # path('api/', include(router.urls)),
]
