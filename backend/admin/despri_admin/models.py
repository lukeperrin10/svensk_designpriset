from django.db import models
from django.utils.translation import ugettext_lazy as _
from datetime import date, datetime, timezone

class BaseModel(models.Model):
    created = models.DateTimeField(auto_now_add=True)
    modified = models.DateTimeField(auto_now=True)

    class Meta:
        abstract = True

class Category(BaseModel):
    name = models.CharField(_('Name'), max_length=255, null=False)
    description = models.TextField(_('Description'), null=True, blank=True)

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
    designer = models.CharField(_('Designer'), max_length=511, null=True, blank=True)
    illustrator = models.CharField(_('Illustrator'), max_length=511, null=False, blank=False)
    leader = models.CharField(_('Leader'), max_length=511, null=True, blank=True)
    customer = models.CharField(_('Customer'), max_length=511, null=True, blank=True)
    avatar = models.ImageField(_('Avatar'), upload_to="avatars", null=True, blank=True)
    format = models.CharField(_('Format'), max_length=20, null=True, blank=True)
    size = models.CharField(_('Size'), max_length=20, null=True, blank=True)
    webpage = models.URLField(_('Webpage'), max_length=255, null=True, blank=True)
    is_winner_gold = models.BooleanField(_('Winner Gold'), null=False, default=False)
    is_winner_silver = models.BooleanField(_('Winner Silver'), null=False, default=False)
    is_nominated = models.BooleanField(_('Nominated'), null=False, default=False)
    sent_nominee_notification = models.DateField(_('Nominee notification date'), null=True, blank=True)
    motivation = models.TextField(_('Motivation'), null=True, blank=True)
    year = models.CharField(_('Year'), max_length=4, null=False, blank=False)

    def __str__(self):
        return self.entry_name
    class Meta:
        verbose_name = _('Entry')
        verbose_name_plural = _('Entries')
        db_table = 'entries'

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

class Content(BaseModel):
    name = models.CharField(_('Name'), max_length=255, null=False)
    value = models.TextField(_('Value'), null=False, blank=False)

    def __str__(self):
        return self.name
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

class YearConfig(BaseModel):
    year = models.CharField(_('Year'), max_length=4, null=False, blank=False, unique=True)
    #key = models.CharField(_('Key'), max_length=255, null=False, blank=False)
    #value = models.CharField(_('Value'), max_length=255, null=False, blank=False)
    register_deadline_date = models.DateTimeField(_('Register deadline date'), null=True, blank=True)
    phase_1_start = models.DateTimeField(_('Phase 1 start'), null=True, blank=True)
    phase_2_start = models.DateTimeField(_('Phase 2 start'), null=True, blank=True)
    phase_3_start = models.DateTimeField(_('Phase 3 start'), null=True, blank=True)
    phase_4_start = models.DateTimeField(_('Phase 4 start'), null=True, blank=True)
    phase_5_start = models.DateTimeField(_('Phase 5 start'), null=True, blank=True)
    price = models.CharField(_('Price per entry'), max_length=31, null=True, blank=True)
    award_place = models.CharField(_('Award Place'), max_length=255, null=True, blank=True)
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