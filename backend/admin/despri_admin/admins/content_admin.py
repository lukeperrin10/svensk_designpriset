from django_summernote.admin import SummernoteModelAdmin
from django.utils.html import format_html
from .base_admin import BaseAdmin
from ..models import Content

class ContentAdmin(SummernoteModelAdmin, BaseAdmin):
    summernote_fields = ('content',)
    readonly_fields = ('image_preview','preview')
    
    def preview(self, obj):
        return format_html(format(obj.content))

    def image_preview(self, obj):
        return format_html('<a href="{0}"><img width="700px" src="{0}" /></a>'.format(obj.image.url))