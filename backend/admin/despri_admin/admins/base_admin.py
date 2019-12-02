from django.contrib import admin
from django.utils.translation import ugettext_lazy as _

class BaseAdmin(admin.ModelAdmin):
    print('Base admin')
    change_form_template = 'admin/despri_admin/base_change_form_view.html'

    def change_view(self, request, object_id, form_url='', extra_context=None):
        print(request)
        extra_context = extra_context or {}
        url = request.build_absolute_uri()+'?edit=true' 
        extra_context['change_url'] = url
        extra_context['edit_button_label'] = _('Edit')
        extra_context['hide_edit_button'] = request.GET.get('edit')
        return super(BaseAdmin, self).change_view(
            request, object_id, form_url, extra_context=extra_context,
        )
    def has_change_permission(self, request, obj=None):
        # print(request)
        if request.GET.get('edit'):
            return True
        return False