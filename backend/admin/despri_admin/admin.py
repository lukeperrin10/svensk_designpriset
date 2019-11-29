from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import ugettext_lazy as _
from .models import Category, Entry, Poll, Profile, Vote, Phase, YearConfig, Content, Mail


# @admin.register(Entry)
class EntryAdmin(admin.ModelAdmin):
    list_display = ('entry_name', 'profile', 'category', 'customer', 'source', 'image')
    search_fields = ('entry_name', 'profile__company')
    change_list_template = 'admin/despri_admin/entry_change_list.html'

    def image(self, obj):
        return format_html('<a href="{0}"><img height="100px" src="{0}" /></a>'.format(obj.avatar.url))
    # print(Entry.getCount())

    def changelist_view(self, request, extra_context=None):
        response = super().changelist_view(
            request,
            extra_context=extra_context,
        )
        count = Entry.getCount()
        response.context_data['total_count'] = count['total']
        response.context_data['nominees'] = count['nominees']
        response.context_data['winner_gold'] = count['winner_gold']
        response.context_data['winner_silver'] = count['winner_silver']
        response.context_data['total_count_label'] = _('Amount of entries:')
        response.context_data['nominees_label'] = _('Amount of nominated entries:')
        response.context_data['winner_gold_label'] = _('Amount of winning entries gold:')
        response.context_data['winner_silver_label'] = _('Amount of winning entries silver:')
        response.context_data['stats_label'] = _('Entry statistics')
        
        return response

admin.site.register(Category)
admin.site.register(Entry, EntryAdmin)
admin.site.register(Poll)
admin.site.register(Profile)
admin.site.register(Vote)
#admin.site.register(Phase, PhaseAdmin)
admin.site.register(YearConfig)
admin.site.register(Content)
admin.site.register(Mail)