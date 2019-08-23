from django.db import models
from django.utils.safestring import mark_safe

from .choices import STATUS_CHOICES
from django.urls import reverse
from ckeditor.fields import RichTextField


class MainVideo(models.Model):
    video = models.FileField(upload_to='main_video', verbose_name='Видео')
    title = models.CharField(max_length=100, verbose_name='Название видео')
    title_kg = models.CharField(max_length=100, verbose_name='Название видео на КГ', blank=True, null=True)
    image = models.ImageField(upload_to='video_image', verbose_name=' Изображение к видео')

    class Meta:
        verbose_name = 'Видео на главной'
        verbose_name_plural = 'Видео на главной'

    def __str__(self):
        return self.title


class MainContacts(models.Model):
    number = models.CharField(max_length=30, verbose_name='Номер телефона')
    main = models.BooleanField(default=False, verbose_name='Главный номер')

    class Meta:
        verbose_name = 'Контакты на главной странице'
        verbose_name_plural = 'Контакты на главной странице'

    def __str__(self):
        return self.number


class MainImageTitle(models.Model):
    title = models.CharField(max_length=100, verbose_name='Название')
    title_kg = models.CharField(max_length=100, verbose_name='Название на КГ', blank=True, null=True)

    class Meta:
        verbose_name = 'Название изображения в шапке'
        verbose_name_plural = 'Названия изображений в шапке'

    def __str__(self):
        return self.title


class MainImage(models.Model):
    image = models.ImageField(upload_to='main_image', verbose_name='Изображение')

    class Meta:
        verbose_name = 'Изображение в шапке'
        verbose_name_plural = 'Изображения в шапке'

    def __str__(self):
        return 'Фото на главной странице'


class KgObjects(models.Model):
    object_name = models.CharField(max_length=200, verbose_name='Название')
    object_name_kg = models.CharField(max_length=200, verbose_name='Название на КГ', blank=True, null=True)
    mini_image = models.ImageField(upload_to='mini_image', verbose_name='Мини Аватарка')
    big_image = models.ImageField(upload_to='big_image', verbose_name='Фото для шапки', blank=True, null=True)
    title = models.CharField(max_length=400, verbose_name='Краткое описание')
    title_kg = models.CharField(max_length=400, verbose_name='Краткое описание KG', blank=True, null=True)
    info = models.TextField(verbose_name='Полное описание')
    info_kg = models.TextField(verbose_name='Полное описание KG', blank=True, null=True)
    status = models.CharField(choices=STATUS_CHOICES, max_length=40, verbose_name='Статус', default='planed')
    map = models.CharField(max_length=400, verbose_name='Ссылка на карту', blank=True, null=True)

    class Meta:
        verbose_name = 'Объект'
        verbose_name_plural = 'Объекты'

    def __str__(self):
        return self.object_name

    def get_absolute_url(self):
        return reverse('object_detail', kwargs={'pk': self.id})

    def get_absolute_kg_url(self):
        return reverse('object_detail_kg', kwargs={'pk': self.id})


class ObjectFrame(models.Model):
    kg_object = models.ForeignKey(KgObjects, related_name='object_frame', verbose_name='Объект',
                                  on_delete=models.DO_NOTHING)
    frame = models.CharField(max_length=400, verbose_name='Ссылка на фрейм', blank=True, null=True)

    def __str__(self):
        return self.kg_object.object_name

    class Meta:
        verbose_name_plural = 'Фреймы'
        verbose_name = 'Фрейм'


class ObjectTags(models.Model):
    kg_object = models.ForeignKey(KgObjects, related_name='object_tag', verbose_name='Объект',
                                  on_delete=models.DO_NOTHING)
    tag_name = models.CharField(max_length=500, verbose_name='Название Тега')
    tag_name_kg = models.CharField(max_length=500, verbose_name='Название Тега KG', blank=True, null=True)

    class Meta:
        verbose_name = 'Тег'
        verbose_name_plural = 'Теги'

    def __str__(self):
        return self.tag_name


class ObjectGallery(models.Model):
    media = models.FileField(upload_to='object_gallery', verbose_name='Медиа файл')
    kg_object = models.ForeignKey(KgObjects, related_name='gallery_object', verbose_name='Объект',
                                  on_delete=models.DO_NOTHING)

    class Meta:
        verbose_name = 'Галерея'
        verbose_name_plural = 'Галерея'

    def __str__(self):
        return self.kg_object.object_name


class BuildStep(models.Model):
    step_name = models.CharField(max_length=400, verbose_name='Номер или название этапа')
    media = models.FileField(upload_to='build_step', verbose_name='Медиа')
    title = models.TextField(verbose_name='Описание')
    kg_object = models.ForeignKey(KgObjects, related_name='steps', verbose_name='Объект',
                                  on_delete=models.DO_NOTHING, blank=True, null=True)

    class Meta:
        verbose_name_plural = 'Номер или название этапа'
        verbose_name = 'Номер или название этапа'

    def __str__(self):
        return self.step_name


class NewsArchive(models.Model):
    title = models.CharField(max_length=200, verbose_name='Дата архива')

    class Meta:
        verbose_name_plural = 'Архивы новостей'
        verbose_name = 'Архив новостей'

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('news_archive', kwargs={'pk': self.id})

    def get_absolute_kg_url(self):
        return reverse('news_archive_kg', kwargs={'pk': self.id})


class News(models.Model):
    title = models.CharField(max_length=500, verbose_name='Заголовок')
    title_kg = models.CharField(max_length=500, verbose_name='Заголовок Kg', blank=True, null=True)
    logo = models.ImageField(upload_to='news_logo', verbose_name='Изображение')
    contents = RichTextField(blank=True, null=True, verbose_name='Контент')
    created_date = models.DateField(auto_now=False, verbose_name='Дата')
    archive = models.ForeignKey(NewsArchive, related_name='news', on_delete=models.DO_NOTHING, blank=True, null=True,
                                verbose_name='Архив')

    def get_absolute_url(self):
        return reverse('news_detail', kwargs={'pk': self.id})

    def get_absolute_kg_url(self):
        return reverse('news_detail_kg', kwargs={'pk': self.id})

    class Meta:
        verbose_name = 'Новости и акции'
        verbose_name_plural = 'Новости и акции'

    def __str__(self):
        return self.title


class NewsVideo(models.Model):
    video = models.FileField(upload_to='news_video', verbose_name='Видео новости')
    news = models.ForeignKey(News, related_name='video', verbose_name='Видео', on_delete=models.CASCADE,
                             blank=True, null=True)

    class Meta:
        verbose_name = 'Видео новостей'
        verbose_name_plural = 'Видео новостей'


class NewsContent(models.Model):
    news = models.ForeignKey(News, related_name='content', verbose_name='Контент', on_delete=models.CASCADE,
                             blank=True, null=True)
    image = models.ImageField(upload_to='news_image', verbose_name='Изображение')

    class Meta:
        verbose_name = 'Изображение новостей'
        verbose_name_plural = 'Изображение новостей'


class CharityArchive(models.Model):
    title = models.CharField(max_length=200, verbose_name='Дата архива')

    class Meta:
        verbose_name_plural = 'Архивы благотворительности'
        verbose_name = 'Архив благотворительности'

    def __str__(self):
        return self.title

    def get_absolute_url(self):
        return reverse('charity_archive', kwargs={'pk': self.id})

    def get_absolute_kg_url(self):
        return reverse('charity_archive_kg', kwargs={'pk': self.id})


class Charity(models.Model):
    title = models.CharField(max_length=500, verbose_name='Заголовок')
    title_kg = models.CharField(max_length=500, verbose_name='Заголовок KG', blank=True, null=True)
    logo = models.ImageField(upload_to='charity_logo', verbose_name='Изображение')
    contents = RichTextField(blank=True, null=True, verbose_name='Контент')
    created_date = models.DateField(auto_now=False, verbose_name='Дата')
    archive = models.ForeignKey(CharityArchive, related_name='charity', on_delete=models.DO_NOTHING, blank=True,
                                null=True, verbose_name='Архив')

    def get_absolute_url(self):
        return reverse('charity_detail', kwargs={'pk': self.id})

    def get_absolute_kg_url(self):
        return reverse('charity_detail_kg', kwargs={'pk': self.id})

    class Meta:
        verbose_name = 'Благотворительность'
        verbose_name_plural = 'Благотворительности'

    def __str__(self):
        return self.title


class CharityContent(models.Model):
    charity = models.ForeignKey(Charity, related_name='content', verbose_name='Контент', on_delete=models.CASCADE,
                                blank=True, null=True)
    image = models.ImageField(upload_to='charity_image', verbose_name='Изображение')

    class Meta:
        verbose_name = 'Изображение Благотворительности'
        verbose_name_plural = 'Изображение Благотворительности'


class CharityVideo(models.Model):
    video = models.FileField(upload_to='news_video', verbose_name='Видео Благотворительности')
    news = models.ForeignKey(Charity, related_name='video', verbose_name='Видео', on_delete=models.CASCADE,
                             blank=True, null=True)

    class Meta:
        verbose_name = 'Видео новостей'
        verbose_name_plural = 'Видео новостей'

