from django_summernote.admin import SummernoteModelAdmin
from .base_admin import BaseAdmin
from ..models import Content

class ContentAdmin(SummernoteModelAdmin, BaseAdmin):
    summernote_fields = ('content',)