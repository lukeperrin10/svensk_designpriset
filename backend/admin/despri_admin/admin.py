from django.contrib import admin
from .models import Category, Entry, Poll, Profile, Vote, Phase, YearConfig, Content, Mail






admin.site.register(Category)
admin.site.register(Entry)
admin.site.register(Poll)
admin.site.register(Profile)
admin.site.register(Vote)
#admin.site.register(Phase, PhaseAdmin)
admin.site.register(YearConfig)
admin.site.register(Content)
admin.site.register(Mail)