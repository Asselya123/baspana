from rest_framework import serializers

from .models import Apartment, Builder, UploadedFile, Application, UserProfile, User


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(max_length=150)
    password = serializers.CharField(max_length=128, write_only=True)

class BuilderSerializer(serializers.ModelSerializer):
    class Meta:
        model = Builder
        fields = ['icon', 'name', 'contacts', 'phone_number', 'site', 'email']

class ApartmentSerializer(serializers.ModelSerializer):
    builder = BuilderSerializer(read_only=True)
    builder_id = serializers.PrimaryKeyRelatedField(
        queryset=Builder.objects.all(),
        source='builder',
        write_only=True
    )
    
    class Meta:
        model = Apartment
        fields = ['id', 'name', 'address', 'images', 'object_code', 'floor', 'building_count',
                 'material', 'start_date', 'end_date', 'available_programs', 'conditions',
                 'description', 'has_balcony', 'is_balcony_glazed', 'building_start_date',
                 'home_type', 'bathroom_type', 'security', 'parking_type', 'elevator_type',
                 'apartment_types', 'builder', 'builder_id']

class FileUploadSerializer(serializers.ModelSerializer):
    file_url = serializers.SerializerMethodField()
    
    class Meta:
        model = UploadedFile
        fields = ['id', 'file', 'uploaded_at', 'file_url']
        read_only_fields = ['uploaded_at', 'file_url']
    
    def get_file_url(self, obj):
        request = self.context.get('request')
        file_url = obj.file.url
        return request.build_absolute_uri(file_url) if request else file_url

class ApplicationSerializer(serializers.ModelSerializer):
    user = serializers.StringRelatedField(read_only=True)

    class Meta:
        model = Application
        fields = ['id', 'user', 'name', 'status', 'creation_date', 'document_url']

class NestedUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email', 'first_name', 'last_name']

class UserProfileSerializer(serializers.ModelSerializer):
    user = NestedUserSerializer(read_only=True)
    class Meta:
        model = UserProfile
        fields = ['id', 'user', 'address', 'phone_number', 'social_categories', 'iin']

class ChangePasswordSerializer(serializers.Serializer):
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)

    def validate_new_password(self, value):
        return value