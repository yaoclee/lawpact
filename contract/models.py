from django.db import models
from django.contrib.auth.models import User

class UserProfile(models.Model):
    user = models.OneToOneField(User)
    phone_number = models.CharField(max_length=15)
    pic = models.ImageField(upload_to='images', blank=True)
    
    def __unicode__(self):
        return self.user.username
    

class UserContract(models.Model):
    user = models.ForeignKey(User)
    name = models.CharField(max_length=50)
    type = models.CharField(max_length=20)
    contract_status = models.BooleanField()
    law_status = models.BooleanField()
    backlog_date = models.DateField()
    backlog = models.CharField(max_length=200)
    content = models.TextField()
    file = models.FileField(upload_to='files', blank=True)
    
    def __unicode__(self):
        return self.name

class Backlog(models.Model):
    user = models.ForeignKey(User)
    date = models.DateField()
    content = models.TextField()
    
    def __unicode__(self):
        return self.user.username
