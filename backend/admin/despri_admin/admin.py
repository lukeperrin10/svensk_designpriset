from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import ugettext_lazy as _
from .models import Category, Entry, Poll, Profile, Vote, Phase, YearConfig, Content, Mail, MailVar
from .admins.entry_admin import EntryAdmin
from .admins.base_admin import BaseAdmin
from .admins.poll_admin import PollAdmin
from .admins.mail_admin import MailAdmin





admin.site.register(Category, BaseAdmin)
admin.site.register(Entry, EntryAdmin)
admin.site.register(Poll, PollAdmin)
admin.site.register(Profile, BaseAdmin)
admin.site.register(Vote)
#admin.site.register(Phase, PhaseAdmin)
admin.site.register(YearConfig, BaseAdmin)
admin.site.register(Content, BaseAdmin)
admin.site.register(Mail, MailAdmin)
admin.site.register(MailVar, BaseAdmin)