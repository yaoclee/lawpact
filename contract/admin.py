from django.contrib import admin
from contract import models 

class UserContractAdmin(admin.ModelAdmin):
    #list_display = ('user', 'name', 'backlog', 'content')
    #list_filter = ('user', 'type')
    list_filter = ('user', )
    raw_id_admin = ('user')
    search_fields = ['user__username', 'type', 'name']
    #show fields in the edit mode
    #fields = (('name', 'backlog'), 'content')

"""
class ContractOpts(admin.ModelAdmin):
    list_filter = ('user')
    raw_id_admin = ('user')
"""

admin.site.register(models.UserProfile)
admin.site.register(models.UserContract, UserContractAdmin)
admin.site.register(models.Backlog)