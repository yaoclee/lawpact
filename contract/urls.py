from django.conf.urls import patterns, url
from contract import views

import os
from django.conf.urls.static import static
from django.conf import settings

urlpatterns = patterns('',
        url(r'^$', views.index, name='index'),
        url(r'^login/$', views.user_login, name='login'),
        url(r'^register/$', views.register, name='register'),
        #url(r'^about/$', views.about, name='about'),
        #url(r'^add_category/$', views.add_category, name='add_category'),
        #url(r'^register/$', views.register, name='register'),
        #url(r'^login/$', views.user_login, name='login'),
        #url(r'^category/(?P<category_name_url>\w+)/$', views.category, name='category'),
        )

if settings.DEBUG:
    media_root = os.path.join(settings.PROJECT_PATH, 'media')
    urlpatterns += static('/media/', document_root=media_root)