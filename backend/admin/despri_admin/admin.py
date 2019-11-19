from django.contrib import admin
from .models import Category, Entry, Poll, Profile, Vote


admin.site.register(Category)
admin.site.register(Entry)
admin.site.register(Poll)
admin.site.register(Profile)
admin.site.register(Vote)
