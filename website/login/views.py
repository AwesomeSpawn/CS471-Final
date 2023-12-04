from rest_framework import status
from django.contrib.auth import get_user_model, login, logout
from rest_framework.authentication import SessionAuthentication
from rest_framework.views import APIView
from rest_framework.response import Response
from .models import AppUser
from .serializers import UserRegisterSerializer, UserLoginSerializer, UserSerializer
from rest_framework import permissions, status
from .validations import custom_validation, validate_email, validate_password
from rest_framework.views import APIView
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from django.http import JsonResponse
from django.contrib.auth.decorators import login_required
from jobs.models import Jobs
from timesheet.models import Timesheet
from django.core.exceptions import ObjectDoesNotExist
from rest_framework.decorators import permission_classes
import urllib.parse


# Ensure you have a serializer for the User model
from .serializers import UserSerializer
from django.views.decorators.http import require_http_methods


class LoggedInUserView(APIView):
    permission_classes = [IsAuthenticated]
    authentication_classes = [SessionAuthentication]

    def get(self, request):
        user = get_user_model().objects.get(email=request.user.email)
        serializer = UserSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class UserRegister(APIView):
    permission_classes = (permissions.AllowAny,)

    def post(self, request):
        clean_data = custom_validation(request.data)
        serializer = UserRegisterSerializer(data=clean_data)
        if serializer.is_valid(raise_exception=True):
            user = serializer.create(clean_data)
            if user:
                return Response(serializer.data, status=status.HTTP_201_CREATED)
        return Response(status=status.HTTP_400_BAD_REQUEST)


class UserLogin(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = (SessionAuthentication,)
    ##

    def post(self, request):
        data = request.data
        assert validate_email(data)
        assert validate_password(data)
        serializer = UserLoginSerializer(data=data)

        if serializer.is_valid(raise_exception=True):
            user = serializer.check_user(data)
            login(request, user)
            user_data = UserSerializer(user).data
            return Response({
                'token': serializer.data.get('token'),
                'user_info': user_data
            }, status=status.HTTP_200_OK)


class UserLogout(APIView):
    permission_classes = (permissions.AllowAny,)
    authentication_classes = ()

    def post(self, request):
        logout(request)
        return Response(status=status.HTTP_200_OK)


class UserView(APIView):
    permission_classes = (permissions.IsAuthenticated,)
    authentication_classes = (SessionAuthentication,)
    ##

    def get(self, request):
        serializer = UserSerializer(request.user)
        return Response({'user': serializer.data}, status=status.HTTP_200_OK)


@permission_classes([permissions.AllowAny])
def get_user_data(request, email):
    try:
        decoded_email = urllib.parse.unquote(email)  # Decode the email
        user = AppUser.objects.get(email=decoded_email)

        # Query for Jobs and Timesheet
        jobs = Jobs.objects.filter(assignee=user).values(
            'job_id', 'job_time', 'task_str', 'job_parts')
        timesheets = Timesheet.objects.filter(employee_id=user.user_id).values(
            'hours', 'start_date', 'timesheet_id')

        # Include user role in the response
        user_role = user.role

        return JsonResponse({
            'user_role': user_role,  # Add user role here
            'jobs': list(jobs),
            'timesheets': list(timesheets)
        })

    except ObjectDoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

@permission_classes([permissions.AllowAny])
def get_user_jobs(request, email):
    decoded_email = urllib.parse.unquote(email)
    try:
        user = AppUser.objects.get(email=decoded_email)
        jobs = Jobs.objects.filter(assignee=user).values()
        return JsonResponse({'jobs': list(jobs)})
    except AppUser.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

@permission_classes([permissions.AllowAny])
def get_user_timesheets(request, email):
    decoded_email = urllib.parse.unquote(email)
    try:
        user = AppUser.objects.get(email=decoded_email)
        timesheets = Timesheet.objects.filter(
            employee_id=user.user_id).values()
        return JsonResponse({'timesheets': list(timesheets)})
    except AppUser.DoesNotExist:
        return JsonResponse({'error': 'User not found'}, status=404)

# Endpoint to get list of employees


@require_http_methods(["GET"])
def get_employees(request):
    employees = AppUser.objects.filter(employee=True).values(
        'user_id', 'email', 'username', 'first_name', 'last_name', 'role')
    return JsonResponse(list(employees), safe=False)


