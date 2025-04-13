import os
import uuid
import datetime
from django.core.management.base import BaseCommand
from django.conf import settings
from django.utils import timezone
from django.contrib.auth import get_user_model
from apartments.models import Builder, Apartment, UploadedFile, Application, UserProfile

User = get_user_model()


class Command(BaseCommand):
    help = 'Creates mock data for the application using the newest models'

    def handle(self, *args, **kwargs):
        self.stdout.write(self.style.SUCCESS('Creating mock data...'))

        # Create sample builders
        builders = self._create_builders()

        # Create sample apartments
        apartments = self._create_apartments(builders)

        # Create sample uploaded files
        uploaded_files = self._create_uploaded_files()

        # Create sample user and user profile
        sample_user = self._get_or_create_sample_user()
        self._update_user_profile(sample_user)
        
        # Create admin user
        admin_user = self._get_or_create_admin_user()

        # Create sample applications
        applications = self._create_applications(sample_user)

        self.stdout.write(self.style.SUCCESS(
            f'Created {len(builders)} builders, {len(apartments)} apartments, '
            f'{len(uploaded_files)} uploaded files, and {len(applications)} applications.'
        ))

    def _create_builders(self):
        builders_data = [
            {
                'name': 'BI Group',
                'contacts': 'Нур-Султан, проспект Мангилик Ел, 52/2, 6 этаж',
                'phone_number': '+7 (717) 269-00-00',
                'site': 'https://bi.group',
                'email': 'info@bi.group',
                # Optionally, you could update builder icons too:
                'icon': 'https://via.placeholder.com/150?text=BI+Group',
            },
            {
                'name': 'BAZIS-A',
                'contacts': 'Алматы, улица Кармысова, 66',
                'phone_number': '+7 (727) 393-20-20',
                'site': 'https://bazis.kz',
                'email': 'info@bazis.kz',
                'icon': 'https://via.placeholder.com/150?text=BAZIS-A',
            },
            {
                'name': 'G-Park',
                'contacts': 'Алматы, улица Жарокова, 2/1',
                'phone_number': '+7 (707) 707-67-77',
                'site': 'https://g-park.kz',
                'email': 'info@g-park.kz',
                'icon': 'https://via.placeholder.com/150?text=G-Park',
            },
        ]
        builders = []
        for data in builders_data:
            builder, created = Builder.objects.get_or_create(
                name=data['name'],
                defaults=data
            )
            builders.append(builder)
            if created:
                self.stdout.write(f'Created builder: {builder.name}')
            else:
                self.stdout.write(f'Builder already exists: {builder.name}')
        return builders

    def _create_apartments(self, builders):
        apartments_data = [
            {
                'name': 'ЖК Botanical Garden',
                'address': 'Алматы, улица Тимирязева, 15',
                'images': [
                    # Using Unsplash image URLs (these images are publicly accessible)
                    "https://images.unsplash.com/photo-1580587771525-78b9dba3b914?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8YXBhcnRtZW50fGVufDB8fDB8fA%3D%3D",
                    "https://www.shutterstock.com/image-photo/new-modern-block-flats-green-260nw-2476543287.jpg",
                    "https://www.shutterstock.com/shutterstock/photos/2501530247/display_1500/stock-photo-new-modern-block-of-flats-in-green-area-residential-apartment-with-flat-buildings-exterior-luxury-2501530247.jpg"
                ],
                'object_code': 'BOT-001',
                'floor': 24,
                'building_count': 5,
                'material': 'monolithic',
                'start_date': datetime.date(2023, 6, 1),
                'end_date': datetime.date(2025, 12, 31),
                'available_programs': [
                    'Ипотека под 7%',
                    'Рассрочка на 2 года',
                    'Специальные условия для льготников'
                ],
                'conditions': [
                    'Первоначальный взнос от 20%',
                    'Документы удостоверения личности',
                    'Подтверждение дохода'
                ],
                'description': 'ЖК Botanical Garden - премиум комплекс с видом на Ботанический сад. Просторные планировки, качественная отделка, подземный паркинг и охраняемая территория.',
                'has_balcony': True,
                'is_balcony_glazed': True,
                'building_start_date': datetime.date(2023, 1, 15),
                'home_type': 'apartment',
                'bathroom_type': 'separate',
                'security': 'concierge',
                'parking_type': 'underground',
                'elevator_type': 'both',
                'apartment_types': [
                    {
                        'label': '1-комнатная',
                        'room_count': 1,
                        'min_area': 45,
                        'max_area': 55,
                        'cost_per_square_meter': 500000,
                        'available_count': 10,
                        'scheme_url': "https://www.researchgate.net/publication/320862366/figure/fig1/AS:557332455227392@1509889820936/Scheme-of-floor-plan-of-the-apartment.png"
                    },
                    {
                        'label': '2-комнатная',
                        'room_count': 2,
                        'min_area': 65,
                        'max_area': 75,
                        'cost_per_square_meter': 480000,
                        'available_count': 7,
                        'scheme_url': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQAuUgrqpFXkzMJ0LsBv9UUm0NM9l9SG6mRbQ&s"
                    },
                    {
                        'label': '3-комнатная',
                        'room_count': 3,
                        'min_area': 90,
                        'max_area': 120,
                        'cost_per_square_meter': 450000,
                        'available_count': 5,
                        'scheme_url': "https://thumbs.dreamstime.com/z/architecture-plan-apartment-layout-studio-condominium-flat-house-apartmnent-one-bedroom-small-space-interior-design-elements-189593674.jpg"
                    }
                ],
                'builder': builders[0]
            },
            {
                'name': 'ЖК Green Valley',
                'address': 'Алматы, улица Навои, 310',
                'images': [
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQmFXnLhxdROaeNpRBZ7semgXGWh-ATyot-mA&s",
                    "https://thumbs.dreamstime.com/b/apartment-building-modern-buildings-new-westminster-british-columbia-canada-40351928.jpg"
                ],
                'object_code': 'GRV-002',
                'floor': 16,
                'building_count': 3,
                'material': 'brick',
                'start_date': datetime.date(2023, 3, 15),
                'end_date': datetime.date(2025, 9, 30),
                'available_programs': [
                    'Ипотека под 8.5%',
                    'Рассрочка на 18 месяцев'
                ],
                'conditions': [
                    'Первоначальный взнос от 30%',
                    'Документы удостоверения личности',
                ],
                'description': 'ЖК Green Valley - уютный семейный комплекс в экологически чистом районе города. Развитая инфраструктура, детские площадки, спортивные сооружения.',
                'has_balcony': True,
                'is_balcony_glazed': True,
                'building_start_date': datetime.date(2022, 11, 10),
                'home_type': 'apartment',
                'bathroom_type': 'combined',
                'security': 'security',
                'parking_type': 'ground',
                'elevator_type': 'passenger',
                'apartment_types': [
                    {
                        'label': '1-комнатная',
                        'room_count': 1,
                        'min_area': 40,
                        'max_area': 50,
                        'cost_per_square_meter': 420000,
                        'available_count': 15,
                        'scheme_url': "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRzHA-z7rBD7CBGhnb0wO_zPbZWOvld49ZA5w&s"
                    },
                    {
                        'label': '2-комнатная',
                        'room_count': 2,
                        'min_area': 60,
                        'max_area': 70,
                        'cost_per_square_meter': 400000,
                        'available_count': 10,
                        'scheme_url': "https://thumbs.dreamstime.com/z/architecture-plan-apartment-layout-studio-condominium-flat-house-apartmnent-one-bedroom-small-space-interior-design-elements-189593674.jpg"
                    }
                ],
                'builder': builders[1]
            },
            {
                'name': 'ЖК Nova City',
                'address': 'Нур-Султан, проспект Туран, 55',
                'images': [
                    "https://www.bankrate.com/2019/08/13233037/Condo-vs-apartment.jpeg?auto=webp&optimize=high&crop=16:9",
                    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2heEAr62IA8aYpqsaA_EiI-cMDzmaKRZGIA&s",
                    "https://marvel-b1-cdn.bc0a.com/f00000000155398/www.fsresidential.com/FSR/media/content-files/corporate/images/5-key-differences-article-420x290.jpg",
                    "https://www.tollbrothersapartmentliving.com/wp-content/uploads/2023/03/005_Toll_4_11_19_UnionPl-983x720-1.jpg"
                ],
                'object_code': 'NOV-003',
                'floor': 20,
                'building_count': 7,
                'material': 'monolithic',
                'start_date': datetime.date(2022, 12, 1),
                'end_date': datetime.date(2025, 6, 30),
                'available_programs': [
                    'Ипотека под 7.5%',
                    'Рассрочка на 24 месяца',
                    'Программа "Молодая семья"'
                ],
                'conditions': [
                    'Первоначальный взнос от 15%',
                    'Документы удостоверения личности',
                    'Подтверждение дохода',
                    'Семейное положение (для программы "Молодая семья")'
                ],
                'description': 'ЖК Nova City - современный комплекс в быстро развивающемся районе столицы. Умные квартиры, панорамные окна, подземный паркинг.',
                'has_balcony': True,
                'is_balcony_glazed': True,
                'building_start_date': datetime.date(2022, 8, 5),
                'home_type': 'apartment',
                'bathroom_type': 'separate',
                'security': 'concierge',
                'parking_type': 'underground',
                'elevator_type': 'both',
                'apartment_types': [
                    {
                        'label': '1-комнатная студия',
                        'room_count': 1,
                        'min_area': 35,
                        'max_area': 45,
                        'cost_per_square_meter': 450000,
                        'available_count': 20,
                        'scheme_url': "https://fpg.roomsketcher.com/image/topic/28/image/2-Bedroom-Apartment-Plan-3D.jpg?w=350"
                    },
                    {
                        'label': '2-комнатная',
                        'room_count': 2,
                        'min_area': 55,
                        'max_area': 65,
                        'cost_per_square_meter': 430000,
                        'available_count': 15,
                        'scheme_url': "https://fpg.roomsketcher.com/image/topic/28/image/2-Bedroom-Apartment-Plan-3D.jpg?w=350"
                    },
                    {
                        'label': '3-комнатная',
                        'room_count': 3,
                        'min_area': 80,
                        'max_area': 100,
                        'cost_per_square_meter': 410000,
                        'available_count': 8,
                        'scheme_url': "https://thumbs.dreamstime.com/z/architecture-plan-apartment-layout-studio-condominium-flat-house-apartmnent-one-bedroom-small-space-interior-design-elements-189593674.jpg"
                    },
                    {
                        'label': '4-комнатная',
                        'room_count': 4,
                        'min_area': 120,
                        'max_area': 150,
                        'cost_per_square_meter': 400000,
                        'available_count': 5,
                        'scheme_url': "https://thumbs.dreamstime.com/z/architecture-plan-apartment-layout-studio-condominium-flat-house-apartmnent-one-bedroom-small-space-interior-design-elements-189593674.jpg"
                    }
                ],
                'builder': builders[0]
            }
        ]
        apartments = []
        for data in apartments_data:
            builder = data.pop('builder')
            apartment, created = Apartment.objects.get_or_create(
                name=data['name'],
                defaults={**data, 'builder': builder}
            )
            apartments.append(apartment)
            if created:
                self.stdout.write(f'Created apartment: {apartment.name}')
            else:
                self.stdout.write(f'Apartment already exists: {apartment.name}')
        return apartments

    def _create_uploaded_files(self):
        # Create a directory for mock files if it doesn't exist
        media_root = settings.MEDIA_ROOT
        mock_file_dir = os.path.join(media_root, 'uploads', 'mock')
        os.makedirs(mock_file_dir, exist_ok=True)

        # Create sample text file
        text_file_path = os.path.join(mock_file_dir, 'sample.txt')
        with open(text_file_path, 'w', encoding='utf-8') as f:
            f.write('This is a sample text file for mock data')

        # Create sample image file (1x1 pixel JPEG)
        image_file_path = os.path.join(mock_file_dir, 'sample.jpg')
        if not os.path.exists(image_file_path):
            with open(image_file_path, 'wb') as f:
                f.write(bytes.fromhex(
                    'FFD8FFE000104A4649460001010100480048000000FFDB00430001010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101FFDB00430101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101010101FFC00011080001000103012200021101031101FFC4001F0000010501010101010100000000000000000102030405060708090A0BFFC400B5100002010303020403050504040000017D01020300041105122131410613516107227114328191A1082342B1C11552D1F02433627282090A161718191A25262728292A3435363738393A434445464748494A535455565758595A636465666768696A737475767778797A83838485868788898A92939495969798999AA2A3A4A5A6A7A8A9AAB2B3B4B5B6B7B8B9BAC2C3C4C5C6C7C8C9CAD2D3D4D5D6D7D8D9DAE1E2E3E4E5E6E7E8E9EAF1F2F3F4F5F6F7F8F9FAFFC4001F0100030101010101010101010000000000000102030405060708090A0BFFC400B51100020102040403040705040400010277000102031104052131061241510761711322328108144291A1B1C109233352F0156272D10A162434E125F11718191A262728292A35363738393A434445464748494A535455565758595A636465666768696A737475767778797A82838485868788898A92939495969798999AA2A3A4A5A6A7A8A9AAB2B3B4B5B6B7B8B9BAC2C3C4C5C6C7C8C9CAD2D3D4D5D6D7D8D9DAE2E3E4E5E6E7E8E9EAF2F3F4F5F6F7F8F9FAFFDA000C03010002110311003F00FD51E28A2BE94F9C3FFFD9'
                ))

        uploaded_files = []
        sample_files = [
            ('document1.txt', text_file_path),
            ('document2.txt', text_file_path),
            ('image1.jpg', image_file_path),
            ('image2.jpg', image_file_path),
            ('image3.jpg', image_file_path),
        ]

        from django.core.files import File

        for filename, path in sample_files:
            if UploadedFile.objects.filter(file__endswith=filename).exists():
                self.stdout.write(f'Uploaded file already exists: {filename}')
                continue
            file_obj = UploadedFile()
            with open(path, 'rb') as f:
                django_file = File(f)
                file_obj.file.save(filename, django_file, save=True)
            self.stdout.write(f'Created uploaded file: {file_obj.file.name}')
            uploaded_files.append(file_obj)

        return uploaded_files

    def _get_or_create_sample_user(self):
        # Create a sample user if one does not exist
        username = 'sampleuser'
        email = 'sampleuser@example.com'
        password = 'samplepassword'
        user, created = User.objects.get_or_create(username=username, defaults={'email': email})
        if created:
            user.set_password(password)
            user.save()
            self.stdout.write(f'Created sample user: {username}')
        else:
            self.stdout.write(f'Sample user already exists: {username}')
        return user

    def _update_user_profile(self, user):
        try:
            profile = UserProfile.objects.get(user=user)
            profile.address = '123 Sample Street, Sample City'
            profile.phone_number = '+1234567890'
            profile.social_categories = 'Sample Category'
            profile.iin = str(uuid.uuid4())
            profile.save()
            self.stdout.write(f'Updated user profile for: {user.username}')
        except UserProfile.DoesNotExist:
            self.stdout.write(f'User profile does not exist for: {user.username}')
        return profile

    def _get_or_create_admin_user(self):
        # Create an admin user if one does not exist
        username = 'admin'
        email = 'admin@example.com'
        password = 'adminpass'
        admin_user, created = User.objects.get_or_create(
            username=username, 
            defaults={
                'email': email,
                'is_staff': True,
                'is_superuser': True
            }
        )
        if created:
            admin_user.set_password(password)
            admin_user.save()
            self.stdout.write(f'Created admin user: {username}')
        else:
            self.stdout.write(f'Admin user already exists: {username}')
            # Ensure the user has admin privileges even if it already existed
            if not admin_user.is_staff or not admin_user.is_superuser:
                admin_user.is_staff = True
                admin_user.is_superuser = True
                admin_user.save()
                self.stdout.write(f'Updated privileges for existing admin user: {username}')
        return admin_user

    def _create_applications(self, user):
        applications_data = [
            {
                'name': 'Заявка на покупку квартиры ЖК Botanical Garden',
                'status': 'in_progress',
                'creation_date': timezone.now().date(),
                'document_url': '',
            },
            {
                'name': 'Заявка на покупку квартиры ЖК Green Valley',
                'status': 'success',
                'creation_date': timezone.now().date(),
                'document_url': 'https://example.com/documents/green_valley.pdf',
            },
            {
                'name': 'Заявка на покупку квартиры ЖК Nova City',
                'status': 'fail',
                'creation_date': timezone.now().date(),
                'document_url': '',
            }
        ]
        applications = []
        for data in applications_data:
            application, created = Application.objects.get_or_create(
                name=data['name'],
                user=user,
                defaults=data
            )
            applications.append(application)
            if created:
                self.stdout.write(f'Created application: {application.name}')
            else:
                self.stdout.write(f'Application already exists: {application.name}')
        return applications
