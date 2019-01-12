from django.views.generic import TemplateView
from pages.models import Post
from pages.forms import PostForm
import datetime
import json
from django.shortcuts import render
from django.http import JsonResponse


def HomePageView(request):
    posts = Post.objects.all()
    form = PostForm()
    template_name = 'home.html'
    return render (request, template_name, {'posts':posts,'form':form})


def new_post(request):
    user = request.user

    date = datetime.datetime.now()

    if request.method == 'POST':
        title = request.POST.get('title')
        text = request.POST.get('text')
        post = Post(user=user, title=title, text=text, date=date)
        post.save()

        object_post = {
            'user': post.user.username,
            'title': post.title,
            'text': post.text,
            'date': post.date,
        }

        response = {
            'code': 200,
            'post': object_post
        }

        return JsonResponse(response)

    else:
        error = {'error': 'NOn Post method not allowed'}
        return HttpResponse(json.dumps(error), content_type="application/json")