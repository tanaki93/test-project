# Generated by Django 2.2 on 2019-05-01 10:29

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main_page', '0021_news_contents'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='charitycontent',
            name='text',
        ),
        migrations.RemoveField(
            model_name='charitycontent',
            name='text_kg',
        ),
    ]
