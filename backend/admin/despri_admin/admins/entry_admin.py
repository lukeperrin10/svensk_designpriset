from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import ugettext_lazy as _
from ..models import Entry
from datetime import datetime





class EntryFilter(admin.SimpleListFilter):
    title = _('Entry status')
    parameter_name = 'entry_status'
    def lookups(self, request, model_admin):
        return [
            ('is_nominated', 'Is nominated'),
            ('is_winner_gold', 'Is winner gold'),
            ('is_winner_silver', 'Is winner silver')
        ]

    def queryset(self, request, queryset):
        if self.value() == 'is_nominated':
            return queryset.distinct().filter(is_nominated=True)
        if self.value() == 'is_winner_gold':
            return queryset.distinct().filter(is_winner_gold=True)
        if self.value() == 'is_winner_silver':
            return queryset.distinct().filter(is_winner_silver=True)

# @admin.register(Entry)
class EntryAdmin(admin.ModelAdmin):
    list_display = ('entry_name', 'profile', 'category', 'customer', 'source', 'image', 'sent_nominee_notification', 'is_nominated')
    search_fields = ('entry_name', 'profile__company')
    list_filter = (EntryFilter, 'year')
    actions = ['send_nominee_action']
    change_list_template = 'admin/despri_admin/entry_change_list.html'
    
    def send_nominee_action(self, request, queryset):
        print('send nominee mail')
        # now = datetime.now()
        # queryset.update(sent_nominee_notification=now)
        entries = []
        for entry in queryset.values():
            entries.append(entry['id'])
        print(entries)
    send_nominee_action.short_description = _('Send nominating email')

    def image(self, obj):
        return format_html('<a href="{0}"><img height="100px" src="{0}" /></a>'.format(obj.avatar.url))
    # print(Entry.getCount())

    def changelist_view(self, request, extra_context=None):
        response = super().changelist_view(
                request,
                extra_context=extra_context,
            )
        if (request.method == 'GET'):
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
        