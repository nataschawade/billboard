from django.urls import path

from . import views


urlpatterns = [
    path('', views.HomePageView, name='home'),
    path('new_post/', views.new_post, name='new_post')
]
