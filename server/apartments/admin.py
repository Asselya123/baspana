from django.contrib import admin
from django.utils.html import format_html
from django.db.models import JSONField
from django_json_widget.widgets import JSONEditorWidget
from .models import Apartment, Builder, UploadedFile, Application, UserProfile

@admin.register(Builder)
class BuilderAdmin(admin.ModelAdmin):
    list_display = ('name', 'phone_number', 'email', 'site_link')
    search_fields = ('name', 'phone_number', 'email')
    list_filter = ('name',)
    
    def site_link(self, obj):
        if obj.site:
            return format_html('<a href="{}" target="_blank">{}</a>', obj.site, obj.site)
        return "-"
    site_link.short_description = "Веб-сайт"

class ApartmentTypeInline(admin.TabularInline):
    verbose_name = "Тип квартиры"
    verbose_name_plural = "Типы квартир"
    model = None  # This is virtual, apartment_types is stored as JSONField
    
    def has_add_permission(self, request, obj=None):
        return False
    
    def has_delete_permission(self, request, obj=None):
        return False

@admin.register(Apartment)
class ApartmentAdmin(admin.ModelAdmin):
    formfield_overrides = {
        JSONField: {'widget': JSONEditorWidget},
    }

    list_display = ('name', 'address', 'material', 'floor', 'builder', 'home_type')
    list_filter = ('material', 'home_type', 'builder', 'security', 'has_balcony')
    search_fields = ('name', 'address', 'description')

    fieldsets = (
        ('Основная информация', {
            'fields': ('name', 'address', 'object_code', 'description', 'builder')
        }),
        ('Характеристики здания', {
            'fields': ('material', 'floor', 'building_count', 'building_start_date', 'start_date', 'end_date')
        }),
        ('Дополнительные характеристики', {
            'fields': ('home_type', 'bathroom_type', 'security', 'parking_type', 'elevator_type')
        }),
        ('Балкон', {
            'fields': ('has_balcony', 'is_balcony_glazed')
        }),
        ('Данные JSON', {
            'fields': ('images', 'available_programs', 'conditions', 'apartment_types'),
        })
    )

@admin.register(UploadedFile)
class UploadedFileAdmin(admin.ModelAdmin):
    list_display = ('__str__', 'uploaded_at', 'file_preview', 'file_url')
    readonly_fields = ('file', 'uploaded_at', 'file_preview', 'file_url')
    ordering = ('-uploaded_at',)
    
    def file_preview(self, obj):
        file_url = obj.file.url
        filename = obj.file.name.lower()
        if filename.endswith(('.jpg', '.jpeg', '.png', '.gif')):
            return format_html('<img src="{}" width="100" />', file_url)
        return "Не изображение"
    file_preview.short_description = "Превью"
    
    def file_url(self, obj):
        return format_html('<a href="{}" target="_blank">{}</a>', obj.file.url, obj.file.url)
    file_url.short_description = "URL файла"

@admin.register(Application)
class ApplicationAdmin(admin.ModelAdmin):
    list_display = ('name', 'user', 'status', 'creation_date')
    list_filter = ('status',)
    search_fields = ('name', 'user__username')

    def get_readonly_fields(self, request, obj=None):
        if obj:
            return ['user', 'creation_date', 'name']
        return []

@admin.register(UserProfile)
class UserProfileAdmin(admin.ModelAdmin):
    list_display = ('user', 'phone_number', 'address', 'social_categories')
