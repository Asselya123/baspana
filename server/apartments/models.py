from django.db import models
import os
import uuid
from django.contrib.auth import get_user_model

User = get_user_model()

def upload_path(instance, filename):
    ext = filename.split('.')[-1]
    filename = f"{uuid.uuid4()}.{ext}"
    return os.path.join('uploads', filename)

class UploadedFile(models.Model):
    file = models.FileField(upload_to=upload_path, verbose_name="Файл")
    uploaded_at = models.DateTimeField(auto_now_add=True, verbose_name="Дата загрузки")
    
    def __str__(self):
        return os.path.basename(self.file.name)
        
    class Meta:
        verbose_name = "Загруженный файл"
        verbose_name_plural = "Загруженные файлы"
        ordering = ['-uploaded_at']

class Builder(models.Model):
    icon = models.URLField(blank=True, verbose_name="Иконка")
    name = models.CharField(max_length=255, verbose_name="Название")
    contacts = models.TextField(verbose_name="Контакты")
    phone_number = models.CharField(max_length=20, verbose_name="Номер телефона")
    site = models.URLField(blank=True, verbose_name="Веб-сайт")
    email = models.EmailField(verbose_name="Email")

    def __str__(self):
        return self.name
        
    class Meta:
        verbose_name = "Застройщик"
        verbose_name_plural = "Застройщики"
        ordering = ['name']

class Apartment(models.Model):
    MATERIAL_CHOICES = (
        ('brick', 'Кирпич'),
        ('panel', 'Панель'),
        ('monolithic', 'Монолит'),
        ('other', 'Другое'),
    )
    
    HOME_TYPE_CHOICES = (
        ('apartment', 'Квартира'),
        ('house', 'Дом'),
    )
    
    BATHROOM_TYPE_CHOICES = (
        ('combined', 'Совмещенный'),
        ('separate', 'Раздельный'),
    )
    
    SECURITY_CHOICES = (
        ('security', 'Охрана'),
        ('concierge', 'Консьерж'),
        ('none', 'Отсутствует'),
    )
    
    PARKING_TYPE_CHOICES = (
        ('underground', 'Подземная'),
        ('ground', 'Наземная'),
        ('none', 'Отсутствует'),
    )
    
    ELEVATOR_TYPE_CHOICES = (
        ('passenger', 'Пассажирский'),
        ('cargo', 'Грузовой'),
        ('both', 'Грузопассажирский'),
        ('none', 'Отсутствует'),
    )
    
    name = models.CharField(max_length=255, verbose_name="Название")
    address = models.TextField(verbose_name="Адрес")
    images = models.JSONField(default=list, verbose_name="Изображения")
    object_code = models.CharField(max_length=100, verbose_name="Код объекта")
    floor = models.PositiveIntegerField(verbose_name="Этаж")
    building_count = models.PositiveIntegerField(verbose_name="Количество зданий")
    material = models.CharField(max_length=50, choices=MATERIAL_CHOICES, verbose_name="Материал")
    start_date = models.DateField(verbose_name="Дата начала продаж")
    end_date = models.DateField(verbose_name="Дата завершения")
    available_programs = models.JSONField(default=list, verbose_name="Доступные программы")
    conditions = models.JSONField(default=list, verbose_name="Условия")
    description = models.TextField(verbose_name="Описание")
    has_balcony = models.BooleanField(default=False, verbose_name="Есть балкон")
    is_balcony_glazed = models.BooleanField(default=False, verbose_name="Балкон остеклен")
    building_start_date = models.DateField(verbose_name="Дата начала строительства")
    home_type = models.CharField(max_length=50, choices=HOME_TYPE_CHOICES, verbose_name="Тип жилья")
    bathroom_type = models.CharField(max_length=50, choices=BATHROOM_TYPE_CHOICES, verbose_name="Тип санузла")
    security = models.CharField(max_length=50, choices=SECURITY_CHOICES, verbose_name="Охрана")
    parking_type = models.CharField(max_length=50, choices=PARKING_TYPE_CHOICES, verbose_name="Тип паркинга")
    elevator_type = models.CharField(max_length=50, choices=ELEVATOR_TYPE_CHOICES, verbose_name="Тип лифта")
    apartment_types = models.JSONField(default=list, verbose_name="Типы квартир")
    builder = models.ForeignKey(Builder, on_delete=models.CASCADE, related_name='apartments', verbose_name="Застройщик")
    
    def __str__(self):
        return self.name
        
    class Meta:
        verbose_name = "Квартира"
        verbose_name_plural = "Квартиры"
        ordering = ['name']


class Application(models.Model):
    STATUS_CHOICES = (
        ('success', 'Принято'),
        ('fail', 'Отказано'),
        ('in_progress', 'В процессе'),
    )

    user = models.ForeignKey(
        User,
        on_delete=models.CASCADE,
        related_name='applications',
        verbose_name="Пользователь"
    )
    name = models.CharField(max_length=255, verbose_name="Название")
    status = models.CharField(max_length=50, choices=STATUS_CHOICES, verbose_name="Статус")
    creation_date = models.DateField(verbose_name="Дата создания")
    document_url = models.URLField(blank=True, verbose_name="Ссылка на подтверждающий документ")

    def __str__(self):
        return f"{self.name} — {self.user}"

    class Meta:
        verbose_name = "Заявка"
        verbose_name_plural = "Заявки"
        ordering = ['name']

class UserProfile(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE, related_name='profile')
    address = models.CharField(max_length=255, blank=True, null=True)
    phone_number = models.CharField(max_length=20, blank=True, null=True)
    social_categories = models.CharField(max_length=255, blank=True, null=True)
    iin = models.CharField(max_length=255, blank=True, null=True)

    def __str__(self):
        return f"Профиль: {self.user.username}"