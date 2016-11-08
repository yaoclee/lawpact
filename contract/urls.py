from django.conf.urls import patterns, url
from contract import views

#from wkhtmltopdf.views import PDFTemplateView

import os
from django.conf.urls.static import static
from django.conf import settings
#from numpy.distutils.from_template import template_name_re

urlpatterns = patterns('',
        url(r'^$', views.index, name='index'),
        url(r'^login/$', views.user_login, name='login'),
        url(r'^logout/$', views.user_logout, name='logout'),
        url(r'^register/$', views.register, name='register'),
        url(r'^guider/$', views.guider, name='guider'),
        url(r'^contract-info/$', views.contract_info, name='contract_info'),
        url(r'^literature/$', views.literature, name='literature_contract'),
        url(r'^television-delegate/$', views.television_delegate, name='television_delegate'),
        url(r'^movie-delegate/$', views.movie_delegate, name='movie_delegate'),
        url(r'^user-info/$', views.user_info, name='user_info'),
        url(r'^about/$', views.about, name='about'),
        url(r'^preview-contract/(\d+)/$', views.preview_contract, name='preview_contract'),
        
        # contract row 
        url(r'^contract/delete/$', views.contract_delete, name='contract_delete'),
        url(r'^contract/label/$', views.contract_label, name='contract_label'),
        url(r'^contract/for-review/$', views.contract_for_review, name='contract_for_reivew'),
        url(r'^contract/update-name/$', views.contract_update_name, name='contract_update_name'),
        url(r'^contract/update-law-status/$', views.contract_update_law_status, name='contract_update_law_status'),
        
        # calender
        url(r'^calendar/new/$', views.calendar_new, name='calendar_new'),
        url(r'^calendar/edit/$', views.calendar_edit, name='calendar_edit'),
        url(r'^calendar/delete/$', views.calendar_delete, name='calendar_delete'),
        url(r'^calendar/events/$', views.calendar_events, name='calendar_events'),

        url(r'^reset-password/$', views.reset_password, name='reset_password'),
        url(r'^update-user-info/$', views.update_user_info, name='update_user_info'),
        url(r'^upload-user-image/$', views.upload_user_image, name='upload_user_image'),

        url(r'^activate/(?P<key>.+)$', views.activation, name='activation'),
        url(r'^spdf/(?P<html>.+)$', views.save_pdf, name='generate_pdf'),
        url(r'^get_test_pdf/$', views.print_test_pdf, name='get_pdf_file'),

        # not confirmed
        #url(r'^pdf/$', PDFTemplateView.as_view(template_name='contract/3.html', filename='my_pdf.pdf'),
            #name='pdf'),
        url(r'^create_contract/$', views.create_contract, name='create_new_contract'),

        #test urls...
        url(r'^test_create/$', views.test_create, name='test_create_contract'),
        url(r'^debug/$', views.debug, name='test_debug'),
        #url(r'^about/$', views.about, name='about'),
        #url(r'^add_category/$', views.add_category, name='add_category'),
        #url(r'^register/$', views.register, name='register'),
        #url(r'^login/$', views.user_login, name='login'),
        #url(r'^category/(?P<category_name_url>\w+)/$', views.category, name='category'),

        )

if settings.DEBUG:
    media_root = os.path.join(settings.PROJECT_PATH, 'media')
    urlpatterns += static('/media/', document_root=media_root)