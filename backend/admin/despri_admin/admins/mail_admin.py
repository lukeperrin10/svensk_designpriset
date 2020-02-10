from django.contrib import admin
from django.utils.translation import ugettext_lazy as _
from django_summernote.admin import SummernoteModelAdmin
from .base_admin import BaseAdmin
from ..models import MailVar

class MailAdmin(SummernoteModelAdmin, BaseAdmin):
    summernote_fields = ('content',)
    change_form_template = 'admin/despri_admin/mail_change_form.html'
    
    def get_mail_vars(self):
        mailVars = MailVar.objects.all()
        return mailVars

    def change_view(self, request, object_id, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['vars'] = self.get_mail_vars()
        return super(MailAdmin, self).change_view(
            request, object_id, form_url, extra_context=extra_context,
        )

    def add_view(self, request, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['vars'] = self.get_mail_vars()
        return super(MailAdmin, self).add_view(
            request, form_url, extra_context=extra_context,
        )