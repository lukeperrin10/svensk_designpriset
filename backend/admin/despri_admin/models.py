from django.db import models
from django.utils.translation import ugettext_lazy as _
from django.utils.translation import ugettext as __
from datetime import date, datetime, timezone
from tinymce.models import HTMLField
import random
import string

def getRandom():
    letters = string.ascii_lowercase
    return ''.join(random.choice(letters) for i in range(5))

class BaseModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Category(BaseModel):
    name = models.CharField(_('Name'), max_length=255, null=False)
    order = models.IntegerField(_('Order'), null=True, blank=True)
    description = models.TextField(_('Description'), null=True, blank=True)
    shorttag = models.CharField(_('Shorttag'), max_length=20, null=False,unique=True)
    active = models.BooleanField(_('Active'), null=False, blank=True, default=True)
    type = models.CharField(_('Type'), max_length=255, choices=(('print', _('Print')), ('digital', _('Digital'))), default='digital')

    def __str__(self):
        return self.name
    class Meta:
        verbose_name = _('Category')
        verbose_name_plural = _('Categories')
        db_table = 'categories'


class Profile(BaseModel):
    secret = models.CharField(_('Secret'), max_length=255, null=True, blank=True)
    contact = models.CharField(_('Contact'), max_length=511, null=True, blank=True)
    company = models.CharField(_('Company'), max_length=511)
    address = models.CharField(_('Address'), max_length=511, null=True, blank=True)
    zip = models.CharField(_('Zipcode'), max_length=10, null=True, blank=True)
    city = models.CharField(_('City'), max_length=63, null=True, blank=True)
    phone = models.CharField(_('Phone number'), max_length=31, null=True, blank=True)
    mail = models.EmailField(_('E-mail'), max_length=63)
    homepage = models.URLField(_('Homepage'), max_length=255, null=True, blank=True)
    invoice_paid = models.BooleanField(_('Invoice paid'), null=False, default=False)

    def __str__(self):
        return self.company
    class Meta:
        verbose_name = _('Profile')
        verbose_name_plural = _('Profiles')
        db_table = 'profiles'

class Entry(BaseModel):
    profile = models.ForeignKey(Profile, verbose_name=_('Profile'), related_name='entries', on_delete=models.PROTECT)
    secret = models.CharField(_('Secret'), max_length=255, null=True, blank=True)
    entry_name = models.CharField(_('Entry name'), max_length=127, null=False, blank=False)
    category = models.ForeignKey(Category, related_name='entries', verbose_name=_('Category'), on_delete=models.PROTECT)
    source = models.FileField(_('Source'), upload_to="sources", null=True, blank=True)
    designer = models.CharField(_('Designer'), max_length=511, null=False, blank=False)
    illustrator = models.CharField(_('Illustrator'), max_length=511, null=True, blank=False)
    leader = models.CharField(_('Leader'), max_length=511, null=False, blank=False)
    customer = models.CharField(_('Customer'), max_length=511, null=False, blank=False)
    avatar = models.ImageField(_('Avatar'), upload_to="avatars", null=True, blank=False)
    format = models.CharField(_('Format'), max_length=20, null=True, blank=True)
    size = models.CharField(_('Size'), max_length=20, null=True, blank=True)
    webpage = models.URLField(_('Webpage'), max_length=255, null=True, blank=True)
    video_url = models.URLField(_('Video URL'), max_length=511, null=True, blank=True)
    is_winner_gold = models.BooleanField(_('Winner Gold'), null=False, default=False)
    is_winner_silver = models.BooleanField(_('Winner Silver'), null=False, default=False)
    is_nominated = models.BooleanField(_('Nominated'), null=False, default=False)
    sent_nominee_notification = models.DateField(_('Nominee notification date'), null=True, blank=True)
    motivation = models.TextField(_('Motivation'), null=True, blank=True)
    year = models.CharField(_('Year'), max_length=4, null=False, blank=False)
    description = models.CharField(_('Description'), max_length=200, null=True, blank=True)

    def __str__(self):
        return self.entry_name
    def thumbnail(self):
        self.allow_tags = True
        return '<a href="/media/{0}"><img src="/media/{0}"></a>'.format(self.avatar)
    
    @classmethod
    def getCount(cls):
        total = cls.objects.filter(year='2021').count()
        nominees = cls.objects.filter(is_nominated=False).filter(year='2021').count()
        winner_gold = cls.objects.filter(is_winner_gold=True).filter(year='2021').count()
        winner_silver = cls.objects.filter(is_winner_silver=True).filter(year='2021').count()
        count = {'total': total, 'nominees': nominees, 'winner_gold': winner_gold, 'winner_silver': winner_silver}
        return count
    getCount.short_description = _('Total amount of entries:')

        
    class Meta:
        verbose_name = _('Entry')
        verbose_name_plural = _('Entries')
        db_table = 'entries'
    
class EntryImage(BaseModel):
    image = models.ImageField(_('Image'), upload_to="avatars", null=True, blank=True)
    entry = models.ForeignKey(Entry, verbose_name=_('Entry'), on_delete=models.CASCADE)
    is_featured = models.BooleanField(_('Featured'), null=False, default=False)

    def __str__(self):
        return str(self.id)
    class Meta:
        verbose_name = _('Entry image')
        verbose_name_plural = _('Entry images')
        db_table = 'entry_images'

class Poll(BaseModel):
    name = models.CharField(_('Name'), max_length=255, null=False)
    start = models.DateTimeField(_('Start'), null=False, blank=False)
    stop = models.DateTimeField(_('Stop'), null=False, blank=False)
    categories = models.ManyToManyField(Category, verbose_name=_('Categories'), related_name='polls')
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = _('Poll')
        verbose_name_plural = _('Polls')
        db_table = 'polls'

class ContentTemplate(models.Model):
    name = models.CharField(_('Name'), max_length=255, null=False, default='def')
    description = models.TextField(_('Description'), null=True, blank=True)

    def __str__(self):
        return self.name
    class Meta:
        verbose_name = _('Content template')
        verbose_name_plural = _('Content templates')
        db_table = 'content_template'

class ContentPhase(models.Model):
    name = models.CharField(_('Name'), max_length=255, null=False, default='def')

    def __str__(self):
        return self.name
    class Meta:
        verbose_name = _('ContentPhase')
        verbose_name_plural = _('ContentPhases')
        db_table = 'content_phase'

class Content(BaseModel):
    # PHASE_ONE = 1
    # PHASE_TWO = 2
    # PHASE_THREE = 3
    # PHASE_FOUR = 4
    # PHASE_FIVE = 5
    # PHASE_CHOICES = (
    #     (PHASE_ONE, _('Phase one')),
    #     (PHASE_TWO, _('Phase two')),
    #     (PHASE_THREE, _('Phase three')),
    #     (PHASE_FOUR, _('Phase four')),
    #     (PHASE_FIVE, _('Phase five')),
    # )
    # phase = models.IntegerField(_('Phase'), choices=PHASE_CHOICES, default=PHASE_ONE)
    phases = models.ManyToManyField(ContentPhase, verbose_name=_('Phase'), related_name='content_phases')
    title = models.CharField(_('Title'), max_length=255, null=True)
    content = HTMLField(_('Content'), null=True, blank=True)
    image = models.ImageField(_('Image'), upload_to="content_images", null=True, blank=True)
    order = models.IntegerField(_('Order'), null=True, blank=True)
    template = models.ForeignKey(ContentTemplate, verbose_name=_('Template'), related_name='contents', on_delete=models.PROTECT)

    def __str__(self):
        return self.title
    class Meta:
        verbose_name = _('Content')
        verbose_name_plural = _('Contents')
        db_table = 'content'

class Vote(BaseModel):
    secret = models.CharField(_('Secret'), max_length=255, null=True, blank=True)
    mail = models.EmailField(_('E-mail'), max_length=63)
    #Redundant, since the entry has exactly one category
    #category = models.ForeignKey(Category, related_name='votes', verbose_name=_('Category'), on_delete=models.PROTECT)
    entry = models.ForeignKey(Entry, related_name='votes', verbose_name=_('Entry'), on_delete=models.PROTECT)
    verified = models.DateTimeField(_('Verified'), null=True, blank=True)
    poll = models.ForeignKey(Poll, related_name='votes', verbose_name=_('Poll'), on_delete=models.PROTECT)
    ip = models.CharField(_('Ip number'), max_length=25, null=True, blank=True)
    def __str__(self):
        return f"{self.mail} - {self.entry.entry_name}"
    class Meta:
        verbose_name = _('Vote')
        verbose_name_plural = _('Votes')
        db_table = 'votes'


class Phase(BaseModel):
    start_date = models.DateTimeField(_('Start date'), null=False, blank=False)
    name = models.CharField(_('Name'), max_length=63, null=False, blank=False)
    def __str__(self):
        return self.name
    class Meta:
        verbose_name = _('Phase')
        verbose_name_plural = _('Phases')
        ordering = ['start_date']
        db_table = 'phases'
    @classmethod
    def get_current_phase(cls):
        phases = [phase for phase in cls.objects.all()]
        for i in range(len(phases)):
            phase = phases[i]
            if phase.start_date >= datetime.now(timezone.utc):
                return phases[max(0, i - 1)]
        return phases[0]

class Mail(BaseModel):
    MAIL_TYPE = (
        ('ENTRY_CONFIRM', __('Entry confirmation')),
        ('ENTRY_CONFIRM_ADMIN', __('Entry confirmation for Admin')),
        ('ENTRY_UPDATE', __('Entry update confirmation')),
        ('ENTRY_UPDATE_ADMIN', __('Entry update confirmation for admin')),
        ('NOMINEE', __('Nominee')),
        ('VOTE_CONFIRM', __('Vote confirmation'))
    )
    type = models.CharField(_('Type'), choices=MAIL_TYPE, default='ENTRY_CONFIRM', max_length=255, unique=True, null=False, blank=False)
    sender = models.CharField(_('Sender'), max_length=80, null=False, blank=False)
    subject = models.CharField(_('Subject'), max_length=80, null=False, blank=False)
    content = HTMLField(_('Content'), null=True, blank=True)

    def __str__(self):
        for t in self.MAIL_TYPE:
            if t[0] == self.type:
                return t[1]
        return self.type
    # def __str__(self):
    #     return self.type
    class Meta:
        verbose_name = _('Mail')
        verbose_name_plural = _('Mails')
        db_table = 'mails'

class MailVar(models.Model):
    name = models.CharField(_('Name'), max_length=255, null=False, blank=False)
    value = models.CharField(_('Value'), max_length=255, null=False, blank=False)

    def __str__(self):
        return self.name
    class Meta:
        verbose_name = _('MailVar')
        verbose_name_plural = _('MailVars')
        db_table = 'mailvars'


class YearConfig(BaseModel):
    year = models.CharField(_('Year'), max_length=4, null=True, blank=False, unique=True)
    #key = models.CharField(_('Key'), max_length=255, null=False, blank=False)
    #value = models.CharField(_('Value'), max_length=255, null=False, blank=False)
    phase_1_start = models.DateTimeField(_('Phase 1 start'), null=True, blank=False)
    phase_2_start = models.DateTimeField(_('Phase 2 start'), null=True, blank=False)
    phase_3_start = models.DateTimeField(_('Phase 3 start'), null=True, blank=False)
    phase_4_start = models.DateTimeField(_('Phase 4 start'), null=True, blank=False)
    phase_5_start = models.DateTimeField(_('Phase 5 start'), null=True, blank=False)
    register_deadline_date = models.DateTimeField(_('Register deadline date'), null=True, blank=False)
    nominees_can_edit_start = models.DateTimeField(_('Nominees can edit Start'), null=True, blank=False)
    nominees_can_edit_end = models.DateTimeField(_('Nominees can edit End'), null=True, blank=False)
    delayed_deadline_end = models.DateTimeField(_('Delayed inofficial deadline end'), null=True, blank=False)
    price = models.CharField(_('Price per entry'), max_length=31, null=True, blank=False)
    award_place = models.CharField(_('Award Place'), max_length=255, null=True, blank=False)
    award_date = models.DateTimeField(_('Award Date'), null=True, blank=False)
    #WARNING: This file must not be indexed by google before Phase 4 is over:
    winner_preview = models.FileField(_('Winner Preview'), upload_to="winner_previews", null=True, blank=True)
    
    #phases = models.ManyToManyField(Phase, verbose_name="phases")
    def __str__(self):
        return self.year
    class Meta:
        verbose_name = _('Config')
        verbose_name_plural = _('Configs')
        ordering = ['-modified']
        db_table = 'yearconfig'

    @classmethod
    def get_current_phase(cls):
        conf = cls.objects.get(year=datetime.now().year)
        d = datetime.now(timezone.utc)
        if d < conf.phase_1_start:
            return 5
        if d < conf.phase_2_start:
            return 1
        if d < conf.phase_3_start:
            return 2
        if d < conf.phase_4_start:
            return 3
        if d < conf.phase_5_start:
            return 4
        return 1