from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework.permissions import AllowAny
from django.contrib.auth import authenticate
from .serializers import UserProfileSerializer
from rest_framework.permissions import IsAuthenticated


class RegisterView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        serializer = UserProfileSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        user.set_password(user.password)
        user.save()
        return Response({'message': 'User registered successfully'}, status=status.HTTP_201_CREATED)


class LoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request, *args, **kwargs):
        email = request.data.get('email')
        password = request.data.get('password')

        user = authenticate(request, email=email, password=password)

        if user:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
                'refresh': str(refresh),
                'user': UserProfileSerializer(user).data
            }, status=status.HTTP_200_OK)
        else:
            return Response({'message': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)


class UserDetailView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request, *args, **kwargs):
        user = request.user
        serializer = UserProfileSerializer(user)
        return Response(serializer.data, status=status.HTTP_200_OK)


class LogoutView(APIView):
    def post(self, request):
        # Get the refresh token from the request data
        refresh_token = request.data.get('refresh_token')

        if refresh_token:
            try:
                # Create a RefreshToken instance and blacklist the token
                refresh_token_instance = RefreshToken(refresh_token)
                refresh_token_instance.blacklist()

                return Response({'message': 'Logout successful'}, status=status.HTTP_200_OK)
            except Exception as e:
                # Handle exceptions, e.g., if the provided tokens are invalid
                print(e)
                return Response({'message': 'Invalid tokens'}, status=status.HTTP_400_BAD_REQUEST)
        else:
            # No refresh token provided in the request
            return Response({'message': 'No refresh token provided'}, status=status.HTTP_400_BAD_REQUEST)
