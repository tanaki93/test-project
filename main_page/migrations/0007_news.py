# Generated by Django 2.2 on 2019-04-17 02:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_page', '0006_mainvideo'),
    ]

    operations = [
        migrations.CreateModel(
            name='News',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=500, verbose_name='Заголовок')),
                ('logo', models.ImageField(upload_to='news_logo', verbose_name='Изображение')),
                ('text', models.TextField(verbose_name='Текст новости')),
            ],
            options={
                'verbose_name': 'Новости и акции',
                'verbose_name_plural': 'Новости и акции',
            },
        ),
    ]
