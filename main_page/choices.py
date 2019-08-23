from __future__ import unicode_literals
from django.utils.translation import ugettext_lazy as _

READY = 'ready'
PLANED = 'planed'
PROGRESS = 'progress'

STATUS_CHOICES = (
    (READY, _('Готовый')),
    (PLANED, _('Запланированный')),
    (PROGRESS, _('В процессе'))
)
