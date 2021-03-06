# Generated by Django 2.2 on 2019-04-22 03:35

from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('main_page', '0012_buildstep_kg_object'),
    ]

    operations = [
        migrations.CreateModel(
            name='NewsArchive',
            fields=[
                ('id', models.AutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=200, verbose_name='Дата архива')),
            ],
            options={
                'verbose_name': 'Архив новостей',
                'verbose_name_plural': 'Архивы новостей',
            },
        ),
        migrations.AlterField(
            model_name='news',
            name='created_date',
            field=models.DateField(verbose_name='Дата'),
        ),
        migrations.AddField(
            model_name='news',
            name='archive',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.DO_NOTHING, related_name='news', to='main_page.NewsArchive', verbose_name='Архив'),
        ),
    ]
