from django.urls import path
from .views import MainPageView, MainPageViewKg, ObjectDetail, ObjectDetailKg, NewsDetail, NewsList, NewsArchiveView, \
    CharityDetail, CharityList, send_email, MapView, \
    CharityArchiveView, NewsDetailKg, NewsListKg, NewsArchiveViewKg, CharityListKg, CharityArchiveViewKg, \
    CharityDetailKg
from django.conf import settings
from django.conf.urls.static import static

urlpatterns = [
    path('', MainPageView.as_view(), name='home_page'),
    path('kg/', MainPageViewKg.as_view(), name='home_page_kg'),
    path('object/<int:pk>/', ObjectDetail.as_view(), name='object_detail'),
    path('object/kg/<int:pk>/', ObjectDetailKg.as_view(), name='object_detail_kg'),
    path('news/<int:pk>/', NewsDetail.as_view(), name='news_detail'),
    path('news/kg/<int:pk>/', NewsDetailKg.as_view(), name='news_detail_kg'),
    path('news/', NewsList.as_view(), name='news_list'),
    path('news/kg/', NewsListKg.as_view(), name='news_list_kg'),
    path('news/archive/<int:pk>/', NewsArchiveView.as_view(), name='news_archive'),
    path('news/archive/kg/<int:pk>/', NewsArchiveViewKg.as_view(), name='news_archive_kg'),
    path('charity/<int:pk>/', CharityDetail.as_view(), name='charity_detail'),
    path('charity/', CharityList.as_view(), name='charity_list'),
    path('charity/archive/<int:pk>/', CharityArchiveView.as_view(), name='charity_archive'),
    path('charity/kg/<int:pk>/', CharityDetailKg.as_view(), name='charity_detail_kg'),
    path('charity/kg/', CharityListKg.as_view(), name='charity_list_kg'),
    path('charity/archive/kg/<int:pk>/', CharityArchiveViewKg.as_view(), name='charity_archive_kg'),
    path('send_email/', send_email, name='send_email'),
    path('map/', MapView.as_view(), name='map_view'),
]

urlpatterns += static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
