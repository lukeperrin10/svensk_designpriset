from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import ugettext_lazy as _
from .models import Category, Entry, Poll, Profile, Vote, Phase, YearConfig, Content, Mail
from .admins.entry_admin import EntryAdmin



admin.site.register(Category)
admin.site.register(Entry, EntryAdmin)
admin.site.register(Poll)
admin.site.register(Profile)
admin.site.register(Vote)
#admin.site.register(Phase, PhaseAdmin)
admin.site.register(YearConfig)
admin.site.register(Content)
admin.site.register(Mail)