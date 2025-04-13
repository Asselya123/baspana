from rest_framework import viewsets, status, parsers
from rest_framework.decorators import api_view, permission_classes, parser_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework_simplejwt.tokens import RefreshToken
from django.contrib.auth import authenticate
from .models import Apartment, Builder, UploadedFile, Application
from .serializers import ApartmentSerializer, BuilderSerializer, LoginSerializer, FileUploadSerializer, \
    ApplicationSerializer, UserProfileSerializer, ChangePasswordSerializer

@api_view(['POST'])
@permission_classes([AllowAny])
def login_view(request):
    """
    Аутентификация пользователя.
    
    Принимает имя пользователя и пароль, возвращает JWT токен доступа.
    """
    serializer = LoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data.get('username')
        password = serializer.validated_data.get('password')
        user = authenticate(username=username, password=password)
        
        if user is not None:
            refresh = RefreshToken.for_user(user)
            return Response({
                'access': str(refresh.access_token),
            })
        return Response({'error': 'Неверные учетные данные'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])  # AllowAny нельзя, иначе request.user — AnonymousUser
def profile_view(request):
    profile = request.user.profile  # обращаемся к UserProfile через related_name
    serializer = UserProfileSerializer(instance=profile)
    return Response(serializer.data)

class BuilderViewSet(viewsets.ModelViewSet):
    """
    API для работы с застройщиками.
    
    Предоставляет операции CRUD для данных застройщиков.
    """
    queryset = Builder.objects.all()
    serializer_class = BuilderSerializer
    permission_classes = [IsAuthenticated]

class ApartmentViewSet(viewsets.ModelViewSet):
    """
    API для работы с квартирами.
    
    Предоставляет операции CRUD для данных о квартирах.
    """
    queryset = Apartment.objects.all()
    serializer_class = ApartmentSerializer
    permission_classes = [IsAuthenticated]

class FileUploadViewSet(viewsets.ModelViewSet):
    """
    API для работы с загруженными файлами.
    
    Предоставляет операции CRUD для загруженных файлов.
    """
    queryset = UploadedFile.objects.all()
    serializer_class = FileUploadSerializer
    parser_classes = [parsers.MultiPartParser, parsers.FormParser]
    permission_classes = [IsAuthenticated]
    
    def get_serializer_context(self):
        context = super().get_serializer_context()
        return context
    
@api_view(['POST'])
@permission_classes([AllowAny])
@parser_classes([parsers.MultiPartParser, parsers.FormParser])
def upload_file(request):
    """
    Загрузка файла.
    
    Загружает файл на сервер и возвращает URL и путь к файлу на сервере.
    Для загрузки используйте multipart/form-data с полем 'file'.
    """
    if 'file' not in request.FILES:
        return Response({'error': 'Файл не был отправлен'}, status=status.HTTP_400_BAD_REQUEST)
    
    serializer = FileUploadSerializer(data=request.data, context={'request': request})
    if serializer.is_valid():
        file_obj = serializer.save()
        return Response({
            'file_url': request.build_absolute_uri(file_obj.file.url),
            'path': file_obj.file.name
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class ApplicationViewSet(viewsets.ModelViewSet):
    serializer_class = ApplicationSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Application.objects.filter(user=self.request.user)

    def perform_create(self, serializer):
        serializer.save(user=self.request.user)

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def change_password_view(request):
    user = request.user
    serializer = ChangePasswordSerializer(data=request.data)

    if serializer.is_valid():
        if not user.check_password(serializer.validated_data['old_password']):
            return Response({'old_password': ['Неверный текущий пароль.']}, status=status.HTTP_400_BAD_REQUEST)

        user.set_password(serializer.validated_data['new_password'])
        user.save()

        return Response({'detail': 'Пароль успешно изменён.'}, status=status.HTTP_200_OK)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)