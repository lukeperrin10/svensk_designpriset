from django.contrib import admin
from django.utils.html import format_html
from django.utils.translation import ugettext_lazy as _
from .base_admin import BaseAdmin
from ..models import Entry, Vote, Poll
import operator
from django.urls import reverse

class PollAdmin(BaseAdmin):
    change_form_template = 'admin/despri_admin/poll_change_form.html'

    # def format_entry(entry):


    def get_poll_content(self, id):
        current_poll = Poll.objects.get(id=id)
        poll_content = {
            "poll": current_poll,
            "categories": []
        }
        for cat in current_poll.categories.all():
            category_with_entries = {
                "category": cat,
                "entries": []
            }
            for e in Entry.objects.all().filter(category=cat):
                entry = {
                    "entry": e,
                    "votes": Vote.objects.filter(entry=e, poll=current_poll).count(),
                    "link": reverse('admin:{}_{}_change'.format(e._meta.app_label, e._meta.model_name), args=(e.pk,))
                }
                entries = category_with_entries['entries']
                entries.append(entry)
                category_with_entries['entries'] = sorted(entries, key=operator.itemgetter('votes'))
            
            categories = poll_content['categories']
            categories.append(category_with_entries)
            poll_content['categories'] = categories
        return poll_content
        # for cat in current_poll(categories):
        #     print(cat)
        

    def change_view(self, request, object_id, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['poll_content'] = self.get_poll_content(object_id)
        return super(PollAdmin, self).change_view(
            request, object_id, form_url, extra_context=extra_context,
        )