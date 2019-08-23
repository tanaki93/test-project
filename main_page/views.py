from django.shortcuts import render, get_object_or_404, redirect
from django.core.mail import send_mail
from django.views.generic import TemplateView, DetailView, ListView
from .models import MainContacts, MainImageTitle, MainImage, KgObjects, MainVideo, News, ObjectTags, ObjectGallery, \
    BuildStep, NewsArchive, CharityArchive, Charity, ObjectFrame, NewsContent, CharityContent, CharityVideo, NewsVideo


class MapView(TemplateView):
    template_name = 'map.html'


class MainPageView(TemplateView):
    template_name = 'home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['image_title'] = MainImageTitle.objects.all().last()
        context['banner'] = MainImage.objects.all().last()
        context['ready_objects'] = KgObjects.objects.filter(status='ready')
        context['progress_objects'] = KgObjects.objects.filter(status='progress')
        context['videos'] = MainVideo.objects.all()
        context['news'] = News.objects.filter(archive=None).order_by('-created_date')
        context['all_objects'] = KgObjects.objects.all()
        return context


class MainPageViewKg(TemplateView):
    template_name = 'home_kg.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['image_title'] = MainImageTitle.objects.all().last()
        context['banner'] = MainImage.objects.all().last()
        context['ready_objects_kg'] = KgObjects.objects.filter(status='ready')
        context['progress_objects_kg'] = KgObjects.objects.filter(status='progress')
        context['videos_kg'] = MainVideo.objects.all()
        context['news'] = News.objects.filter(archive=None).order_by('-created_date')
        context['all_objects'] = KgObjects.objects.all()
        return context


class ObjectDetail(DetailView):
    template_name = 'object_detail.html'
    model = KgObjects

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['frames'] = ObjectFrame.objects.filter(kg_object=self.object)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['tags'] = ObjectTags.objects.filter(kg_object=self.object)
        context['gallery'] = ObjectGallery.objects.filter(kg_object=self.object)
        context['step'] = BuildStep.objects.filter(kg_object=self.object)
        return context


class ObjectDetailKg(DetailView):
    template_name = 'object_detail_kg.html'
    model = KgObjects

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['frames'] = ObjectFrame.objects.filter(kg_object=self.object)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['tags'] = ObjectTags.objects.filter(kg_object=self.object)
        context['gallery'] = ObjectGallery.objects.filter(kg_object=self.object)
        context['step'] = BuildStep.objects.filter(kg_object=self.object)
        return context


class NewsDetail(DetailView):
    template_name = 'news_detail.html'
    model = News

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['last_4_news'] = News.objects.all().order_by('-id')[:4]
        context['news_archive'] = NewsArchive.objects.all()
        context['content'] = NewsContent.objects.filter(news=self.object)
        context['video'] = NewsVideo.objects.filter(news=self.object)
        return context


class NewsDetailKg(DetailView):
    template_name = 'news_detail_kg.html'
    model = News

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['last_4_news'] = News.objects.all().order_by('-id')[:4]
        context['news_archive'] = NewsArchive.objects.all()
        context['content'] = NewsContent.objects.filter(news=self.object)
        context['video'] = NewsVideo.objects.filter(news=self.object)
        return context


class NewsList(ListView):
    template_name = 'news_list.html'
    model = News
    queryset = News.objects.all().order_by('-created_date')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['last_4_news'] = News.objects.all().order_by('-id')[:4]
        context['news_archive'] = NewsArchive.objects.all()
        return context


class NewsListKg(ListView):
    template_name = 'news_list_kg.html'
    model = News
    queryset = News.objects.all().order_by('-created_date')

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['last_4_news'] = News.objects.all().order_by('-id')[:4]
        context['news_archive'] = NewsArchive.objects.all()
        return context


class NewsArchiveView(DetailView):
    template_name = 'news_archive.html'
    model = NewsArchive

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['last_4_news'] = News.objects.all().order_by('-id')[:4]
        context['news_archive'] = NewsArchive.objects.all()
        archive = NewsArchive.objects.get(pk=self.kwargs['pk'])
        context['news'] = News.objects.filter(archive=archive)
        return context


class NewsArchiveViewKg(DetailView):
    template_name = 'news_archive.html'
    model = NewsArchive

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['last_4_news'] = News.objects.all().order_by('-id')[:4]
        context['news_archive'] = NewsArchive.objects.all()
        archive = NewsArchive.objects.get(pk=self.kwargs['pk'])
        context['news'] = News.objects.filter(archive=archive)
        return context


class CharityDetail(DetailView):
    template_name = 'charity_detail.html'
    model = Charity

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['last_4_charity'] = Charity.objects.all().order_by('-id')[:4]
        context['charity_archive'] = CharityArchive.objects.all()
        context['content'] = CharityContent.objects.filter(charity=self.object)
        context['video'] = CharityVideo.objects.filter(news=self.object)
        return context


class CharityDetailKg(DetailView):
    template_name = 'charity_detail_kg.html'
    model = Charity

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['last_4_charity'] = Charity.objects.all().order_by('-id')[:4]
        context['charity_archive'] = CharityArchive.objects.all()
        context['content'] = CharityContent.objects.filter(charity=self.object)
        context['video'] = CharityVideo.objects.filter(news=self.object)
        return context


class CharityList(ListView):
    template_name = 'charity_list.html'
    model = Charity
    queryset = Charity.objects.filter(archive=None)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['last_4_charity'] = Charity.objects.all().order_by('-id')[:4]
        context['charity_archive'] = CharityArchive.objects.all()
        return context


class CharityListKg(ListView):
    template_name = 'charity_list_kg.html'
    model = Charity
    queryset = Charity.objects.filter(archive=None)

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['last_4_charity'] = Charity.objects.all().order_by('-id')[:4]
        context['charity_archive'] = CharityArchive.objects.all()
        return context


class CharityArchiveView(DetailView):
    template_name = 'charity_archive.html'
    model = CharityArchive

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['last_4_charity'] = Charity.objects.all().order_by('-id')[:4]
        context['charity_archive'] = CharityArchive.objects.all()
        archive = CharityArchive.objects.get(pk=self.kwargs['pk'])
        context['charity'] = Charity.objects.filter(archive=archive)
        return context


class CharityArchiveViewKg(DetailView):
    template_name = 'charity_archive_kg.html'
    model = CharityArchive

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['phones'] = MainContacts.objects.all().exclude(main=True)
        context['main_phone'] = get_object_or_404(MainContacts, main=True)
        context['last_4_charity'] = Charity.objects.all().order_by('-id')[:4]
        context['charity_archive'] = CharityArchive.objects.all()
        archive = CharityArchive.objects.get(pk=self.kwargs['pk'])
        context['charity'] = Charity.objects.filter(archive=archive)
        return context


def send_email(request):
    subject = request.POST.get('user_object', '')
    message = 'Имя: '
    message += request.POST.get('user_name', '')
    message += '. Телефон: '
    message += request.POST.get('user_phone', '')
    from_email = 'kggroup2020@gmail.com'
    send_mail(subject, message, from_email, ['info@kg-group.kg'])
    return redirect('home_page')

