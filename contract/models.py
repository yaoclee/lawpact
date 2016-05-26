# coding=utf-8

from django.db import models
from django.contrib.auth.models import User

from django.utils.translation import ugettext_lazy as _

class UserProfile(models.Model):
    user = models.OneToOneField(User, verbose_name=u"用户")
    phone_number = models.CharField(u"电话号码", max_length=15, blank=True)
    pic = models.ImageField(u"头像", upload_to='images', blank=True)
    contract_url = models.URLField(blank=True)
    
    #For user active by the email
    activation_key = models.CharField(max_length=40, null=True)
    key_expires = models.DateTimeField(blank=True, null=True)
   
    class Meta:
        verbose_name = u"1.注册用户信息"
        verbose_name_plural = u"1.注册用户信息"
    
    def __unicode__(self):
        return self.user.username
    
CONTRACT_STATUS_CHOICES = (
    ('0', u'未审核'),
    ('1', u'已审核'),
    ('2', u'审核中'),
)

LAW_STATUS_CHOICES = (
    ('0', u'已生效'),
    ('1', u'已终止'),

)

def user_file_folder(instance, filename):
    #return "files/user_%s/%s" % (instance.user.id, filename)
    return "files/%s/%s" % (instance.user.id, filename)
    #print 'files/user_{0}/{1}' % (instance.user.id, filename)
    #return "files/user_{0}/{1}" % (instance.user.id, filename)
class UserContract(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=50, verbose_name=_('name'))
    type = models.CharField(max_length=20, verbose_name=u"合同类型", blank=True)
    #contract_status = models.BooleanField(verbose_name = u"合同状态", blank=True)
    contract_status = models.CharField(verbose_name = u"合同状态", max_length=1, choices=CONTRACT_STATUS_CHOICES, blank=True)
    law_status = models.CharField(verbose_name = u"法律状态", max_length=1, choices=LAW_STATUS_CHOICES, blank=True)

    #backlog_date = models.DateField()
    #backlog = models.CharField(max_length=200)
    content = models.TextField(blank=True)
    #file = models.FileField(upload_to='files', blank=True)
    file = models.FileField(upload_to=user_file_folder)
    
    class Meta:
        verbose_name = u"2.合同信息"
        verbose_name_plural = u"2.合同信息"
    
    def __unicode__(self):
        return self.name

class Backlog(models.Model):
    user = models.ForeignKey(User)
    date = models.DateField()
    content = models.TextField()
    
    class Meta:
        verbose_name = u"3.待办事项列表"
        verbose_name_plural = u"3.待办事项列表"
    
    def __unicode__(self):
        return self.user.username
