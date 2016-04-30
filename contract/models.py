# coding=gbk

from django.db import models
from django.contrib.auth.models import User

from django.utils.translation import ugettext_lazy as _
from bsddb.test.test_all import verbose

class UserProfile(models.Model):
    user = models.OneToOneField(User, verbose_name=u"用户")
    phone_number = models.CharField(u"电话号码", max_length=15)
    pic = models.ImageField(u"头像", upload_to='images', blank=True)
    validatecode = models.CharField(max_length=128, blank=True)
    contract_url = models.URLField()
    
    class Meta:
        verbose_name = u"注册用户"
        verbose_name_plural = u"注册用户"
    
    def __unicode__(self):
        return self.user.username
    

class UserContract(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=50, verbose_name=_('name'))
    type = models.CharField(max_length=20, verbose_name=u"合同类型")
    contract_status = models.BooleanField(verbose_name = u"合同状态")
    law_status = models.BooleanField()
    backlog_date = models.DateField()
    backlog = models.CharField(max_length=200)
    content = models.TextField()
    file = models.FileField(upload_to='files', blank=True)
    
    class Meta:
        verbose_name = u"用户合同"
        verbose_name_plural = u"用户合同"
    
    def __unicode__(self):
        return self.name

class Backlog(models.Model):
    user = models.ForeignKey(User)
    date = models.DateField()
    content = models.TextField()
    
    class Meta:
        verbose_name = u"待办事项"
        verbose_name_plural = u"待办事项"
    
    def __unicode__(self):
        return self.user.username
