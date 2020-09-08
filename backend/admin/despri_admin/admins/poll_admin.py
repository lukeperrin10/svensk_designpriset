from django.contrib import admin
from django.utils.html import format_html
from django.http import HttpResponse
from django.utils.translation import ugettext_lazy as _
from .base_admin import BaseAdmin
from ..models import Entry, Vote, Poll
import operator
from django.urls import reverse
import csv

class PollAdmin(BaseAdmin):
    change_form_template = 'admin/despri_admin/poll_change_form.html'
    list_display = ('name', 'start', 'stop', 'year')
    # def format_entry(entry):
    actions = ['export_emails']

    def year(self, obj):
        return obj.start.year

    def export_emails(self, request, queryset):
        response = HttpResponse(content_type='text/csv')
        writer = csv.writer(response)
        writer.writerow(['Email'])
        for poll in queryset.values():
            writer.writerow([poll['name']])
            poll_id = poll['id']
            emails = Vote.objects.values('mail').distinct().filter(poll_id=poll_id)
            for email in emails:
                writer.writerow([email['mail']])
        response['Content-Disposition'] = 'attachment; filename="designpriset_emails.csv"'
        return response
    export_emails.short_description = _('Export email adresses')

    def get_poll_content(self, id):
        current_poll = Poll.objects.get(id=id)
        poll_year = current_poll.start.year
        votes = 0
        verified_votes = 0
        poll_content = {
            "poll": current_poll,
            "votes_total": votes,
            "votes_verified": verified_votes,
            "categories": []
        }
        for cat in current_poll.categories.all():
            category_with_entries = {
                "category": cat,
                "entries": []
            }
            for e in Entry.objects.all().filter(category=cat, year=poll_year, is_nominated=True):
                entry_votes = Vote.objects.filter(entry=e, poll=current_poll).count()
                entry_verified_votes = Vote.objects.filter(entry=e, poll=current_poll, verified__isnull=False).count()
                votes += entry_votes
                verified_votes += entry_verified_votes
                entry = {
                    "entry": e,
                    "verified_votes": entry_verified_votes,
                    "votes": entry_votes,
                    "link": reverse('admin:{}_{}_change'.format(e._meta.app_label, e._meta.model_name), args=(e.pk,))
                }
                entries = category_with_entries['entries']
                entries.append(entry)
                category_with_entries['entries'] = sorted(entries, key=operator.itemgetter('votes'), reverse=True)
            
            categories = poll_content['categories']
            categories.append(category_with_entries)
            poll_content['categories'] = categories
            poll_content['votes_total'] = votes
            poll_content['votes_verified'] = verified_votes
        return poll_content
        # for cat in current_poll(categories):
        #     print(cat)
        

    def change_view(self, request, object_id, form_url='', extra_context=None):
        extra_context = extra_context or {}
        extra_context['poll_content'] = self.get_poll_content(object_id)
        return super(PollAdmin, self).change_view(
            request, object_id, form_url, extra_context=extra_context,
        )