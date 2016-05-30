# coding=utf-8

from django.db import models
from django.contrib.auth.models import User

from django.utils.translation import ugettext_lazy as _

USER_PROPERTY_CHOICES = (
    ('0', u'个人'),
    ('1', u'公司'),
    ('2', u'工作室'),
    ('3', u'其他'),
)

USER_OCCUPATION_CHOICES = (
    ('0', u'编剧'),
    ('1', u'导演'),
    ('2', u'演员'),
    ('3', u'经纪人'),
    ('4', u'制片人'),
    ('5', u'策划'),
    ('6', u'宣传'),
    ('7', u'发行'),
    ('8', u'法务/律师'),
    ('7', u'其他'),
)

class UserProfile(models.Model):
    user = models.OneToOneField(User, verbose_name=u"用户")
    pic = models.ImageField(u"头像", upload_to='images', blank=True)
    contract_url = models.URLField(blank=True)
    
    #For user active by the email
    activation_key = models.CharField(max_length=40, null=True, blank=True)
    key_expires = models.DateTimeField(blank=True, null=True)
    
    #detailed info
    real_name = models.CharField(u'姓名', max_length=10, blank=True)
    phone_number = models.CharField(u"电话号码", max_length=15, blank=True)
    
    #optional info
    property = models.CharField(verbose_name = u"用户性质", max_length=1, choices=USER_PROPERTY_CHOICES, blank=True)
    occupation = models.CharField(verbose_name = u"职业", max_length=1, choices=USER_OCCUPATION_CHOICES, blank=True)
    
    #Company related info
    company_name = models.CharField(u'公司名称', max_length=50, blank=True)
    company_address = models.CharField(u'公司地址', max_length=100, blank=True)
    company_email = models.EmailField(u'公司邮箱', blank=True)
   
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
