from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ApartmentViewSet, BuilderViewSet, FileUploadViewSet, ApplicationViewSet, login_view, upload_file, \
    profile_view, change_password_view

router = DefaultRouter()
router.register(r'apartments', ApartmentViewSet)
router.register(r'builders', BuilderViewSet)
router.register(r'files', FileUploadViewSet)
router.register(r'applications', ApplicationViewSet, basename='applications')

urlpatterns = [
    path('', include(router.urls)),
    path('login/', login_view, name='login'),
    path('upload/', upload_file, name='upload-file'),
    path('profile/', profile_view, name='profile'),
    path('change-password/', change_password_view, name='change-password'),
]
