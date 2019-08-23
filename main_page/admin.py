from django.contrib import admin
from django import forms
from django.utils.html import format_html
from ckeditor.widgets import CKEditorWidget
from django.utils.safestring import mark_safe

from .models import MainContacts, MainImageTitle, MainImage, KgObjects, MainVideo, News, ObjectTags, ObjectGallery, \
    BuildStep, NewsArchive, Charity, CharityArchive, ObjectFrame, NewsContent, CharityContent, CharityVideo, NewsVideo


class ObjectTagsInline(admin.TabularInline):
    model = ObjectTags
    fields = ['tag_name', 'tag_name_kg']
    extra = 1


class ObjectFrameInline(admin.TabularInline):
    model = ObjectFrame
    fields = ['frame']
    extra = 1


class ObjectGalleryInline(admin.TabularInline):
    model = ObjectGallery
    extra = 1
    fields = ['media']


class BuildStepInline(admin.TabularInline):
    model = BuildStep
    extra = 1
    fields = ['step_name', 'media', 'title']


class NewsContentInline(admin.TabularInline):
    model = NewsContent
    extra = 0
    fields = ['image', 'image_tag', 'image_url']
    readonly_fields = ['image_tag', 'image_url']

    def image_tag(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url=obj.image.url,
            width=200,
            height=150,
        )
        )

    def image_url(self, obj):
        return 'http://176.123.246.245'+obj.image.url


class CharityContentInline(admin.TabularInline):
    model = CharityContent
    extra = 0
    fields = ['image', 'image_tag', 'image_url']
    readonly_fields = ['image_tag', 'image_url']

    def image_tag(self, obj):
        return mark_safe('<img src="{url}" width="{width}" height={height} />'.format(
            url=obj.image.url,
            width=200,
            height=150,
        )
        )

    def image_url(self, obj):
        return 'http://176.123.246.245' + obj.image.url


class CharityVideoInline(admin.TabularInline):
    model = CharityVideo
    extra = 0
    fields = ['video']


class NewsVideoInline(admin.TabularInline):
    model = NewsVideo
    extra = 0
    fields = ['video']


class NewsAdminForm(forms.ModelForm):
    contents = forms.CharField(widget=CKEditorWidget())

    class Meta:
        model = News
        fields = '__all__'


class ObjectCharity(admin.ModelAdmin):
    list_per_page = 50
    inlines = [CharityContentInline, CharityVideoInline]


class ObjectNews(admin.ModelAdmin):
    form = NewsAdminForm
    list_per_page = 50
    inlines = [NewsContentInline, NewsVideoInline]


class ObjectAdmin(admin.ModelAdmin):
    list_per_page = 50
    inlines = [ObjectTagsInline, ObjectGalleryInline, BuildStepInline, ObjectFrameInline]


admin.site.register(MainContacts)
admin.site.register(MainImageTitle)
admin.site.register(MainImage)
admin.site.register(KgObjects, ObjectAdmin)
admin.site.register(MainVideo)
admin.site.register(News, ObjectNews)
admin.site.register(NewsArchive)
admin.site.register(Charity, ObjectCharity)
admin.site.register(CharityArchive)
