# Generated by Django 2.2 on 2019-05-01 10:35

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main_page', '0022_auto_20190501_1629'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='newscontent',
            name='text',
        ),
        migrations.RemoveField(
            model_name='newscontent',
            name='text_kg',
        ),
    ]
