from django.contrib import admin
from contract import models 
from django.contrib.sites.models import Site
from django.contrib.auth.models import User
from django.contrib.auth.models import Group
from django_evolution.models import Evolution

class UserProfileAdmin(admin.ModelAdmin):
    search_fields = ['user__username',]

class UserContractAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'backlog', 'content')
    list_filter = ('user', 'type')
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

admin.site.register(models.UserProfile, UserProfileAdmin)
admin.site.register(models.UserContract, UserContractAdmin)
admin.site.register(models.Backlog)


admin.site.unregister(User)
admin.site.unregister(Group)
admin.site.unregister(Site)

