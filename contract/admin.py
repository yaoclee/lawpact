# coding=utf-8

from django.contrib import admin
from contract import models 
from django.contrib.sites.models import Site
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django_evolution.models import Evolution
from django.db.models.base import get_absolute_url

class UserProfileAdmin(admin.ModelAdmin):
    search_fields = ['user__username',]
    list_display = ('user', 'get_email', 'contract_url')
    #readonly_fields = ('get_email',)
    fields = ('user', ('real_name', 'phone_number', 'pic'), 
              'property', ('bianju', 'daoyan', 'yanyuan', 'jingjiren', 'zhipianren', 'cehua', 'xuanchuan', 'faxing', 'fawu', 'qita'), 
              ('company_name', 'company_address', 'company_email'))
    readonly_fields = ('get_email',)

    def get_email(self, obj):
        return obj.user.email
    get_email.short_description = u"注册邮箱"

class UserContractAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'type', 'contract_status', 'law_status', 'create_at')
    list_filter = ('contract_status','type')
    #list_filter = ('user', )
    raw_id_admin = ('user')
    search_fields = ['user__username', 'type', 'name']
    #show fields in the edit mode
    #fields = (('name', 'backlog'), 'content')

"""
class ContractOpts(admin.ModelAdmin):
    list_filter = ('user')
    raw_id_admin = ('user')
"""

class BacklogAdmin(admin.ModelAdmin):
    list_display = ('user', 'description', 'start_date', 'end_date')

admin.site.register(models.UserProfile, UserProfileAdmin)
admin.site.register(models.UserContract, UserContractAdmin)
admin.site.register(models.Backlog, BacklogAdmin)


#admin.site.unregister(User)
admin.site.unregister(Group)
admin.site.unregister(Site)

