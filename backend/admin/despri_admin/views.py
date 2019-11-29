from django.shortcuts import render
from django.http import HttpResponse

# Create your views here.

def index(request):
    title = 'Designpriset'
    sub_title = 'En kul tävling'
    # return HttpResponse("<h1>%s</h1><p>%s</p>" % (title, sub_title))
    return render(request, 'base.html', {'title': title, 'sub_title': sub_title})
