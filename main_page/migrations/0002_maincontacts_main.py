# Generated by Django 2.2 on 2019-04-04 19:40

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main_page', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='maincontacts',
            name='main',
            field=models.BooleanField(default=False, verbose_name='Главный номер'),
        ),
    ]
