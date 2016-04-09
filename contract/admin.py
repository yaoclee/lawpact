from django.contrib import admin
from contract import models 

class UserContractAdmin(admin.ModelAdmin):
    list_display = ('user', 'name', 'backlog', 'content')
    #show fields in the edit mode
    #fields = (('name', 'backlog'), 'content')

admin.site.register(models.UserProfile)
admin.site.register(models.UserContract, UserContractAdmin)
admin.site.register(models.Backlog)