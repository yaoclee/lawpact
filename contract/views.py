# coding=utf-8

from django.http import HttpResponse
from django.template.context import RequestContext
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render_to_response, render, get_object_or_404
from django.http.response import HttpResponseRedirect
from contract.form import RegisterForm
from contract.models import UserProfile
from django.contrib.auth.models import User
from django.core.mail import send_mail
import hashlib
import cmd

def index(request):
    context = RequestContext(request)
    return render_to_response("index.html", context)
    #return HttpResponse("Welcome to LawPact")

def user_login(request):
    #context = RequestContext(request)
    error_msg = ""
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        user = authenticate(username=username, password=password)
        if user is not None:
            #Remove is_active check since user may not using email validation code and he can login correctly
            #if user.is_active:
                print "login success!"
                login(request, user) #produce session
                #return render(request, 'contract/index.html')
                return HttpResponseRedirect('/')
            #else:
                #error_msg = "User was not active!"
                #return render(request, "User account is disabled!")
        else:
            print "Invalid login details: {0}, {1}".format(username, password)
            error_msg = u"用户名或密码错误，请重新输入！"
            #render(request, "Invalid detailed provided.")
    return render(request, 'login.html', {'err_msg' : error_msg})

def user_logout(request):
    logout(request)
    return HttpResponseRedirect('/')

def register(request):
    #err_msg = ""
    if request.method == 'POST':
        rf = RegisterForm(request.POST)
        #profile_form = UserProfileForm(data = request.POST)
        if rf.is_valid():
            print "#########is_valid check sucessful!"
            #user = register_form.save()
            #user.save()
            dt = request.POST
            #username = dt.get('username')
            username = rf.cleaned_data['username']
            #email = dt.get('email')
            email = rf.cleaned_data['email']
            #password = dt.get('password')
            password = rf.cleaned_data['password']
            user = User.objects.create_user(username, email, password) 
            if user is not None:
                user.is_active = False
                user.save()
                
                #save UserProfile
                activekey = hashlib.sha1(username).hexdigest()[:15]
                user.activation_key = activekey

                user_profile = UserProfile(user=user,)
                user_profile.activation_key = activekey
                user_profile.save()

                ##send email##
                mail_title = u'律律网账号激活'
                mail_content = u'亲爱的，感谢您的注册，请点击下面链接激活账号\n\n'
                active_link = 'http://localhost:8000/activate/' + activekey
                mail_content += active_link
                mail_from = 'imblues@126.com'
                mail_to = [user.email]
                send_mail(mail_title,
                          mail_content,
                          mail_from,
                          mail_to)
                
                print "success to register"
            else:
                print "failed to register"

                        
            msg = "注册成功，请登录"
            return render(request, 'contract/regSuccess.html')
        else:
            print "fail to validate"
            #print rf.cleaned_data['username']
            return render(request, 'contract/register.html', {'form' : rf})
    
    return render(request, 'contract/register.html')

def activation(request, key):
    #print 'key=%s' % key
    profile = get_object_or_404(UserProfile, activation_key=key)
    if profile is not None:
        if profile.user.is_active == False:
            print "激活成功"
            profile.user.is_active = True
            profile.user.save()
        return HttpResponse(u'账号激活成功')
    return HttpResponse(u'该账号不存在')
    
import os
 
# not confirmed
def save_pdf(request, html):
    print 'html=%s' % html
    cmd = 'echo ' + html + ' | wkhtmltopdf - test.pdf'
    print cmd,
    os.system(cmd)
    return HttpResponse("generate pdf successuflly")

def print_test_pdf(request):
    return printPdf('test.pdf')

def printPdf(path):
    with open(path, "rb") as f:
        data = f.read()
    return HttpResponse(data, mimetype='application/pdf')

import sys
import io
def create_contract(request):
    print sys.getdefaultencoding()
    if request.method == 'POST':
        html_content = request.POST['content']
        if len(html_content) > 0:
            #save as html file
            report_name = 'upload'
            html_file_name = report_name + ".html"
            with io.open(html_file_name, "wt", encoding='utf-8') as f:
                f.write(html_content)
            pdf_file_name = report_name + ".pdf"
            cmd = 'wkhtmltopdf ' + html_file_name + ' ' + pdf_file_name
            print cmd
            os.system(cmd)
        #return save_pdf(request, html_content)
        return HttpResponse(html_content)
    return HttpResponse(u"请求地址无效")
# Just for testing
def test_create(request):
    context = RequestContext(request)
    return render_to_response("001.html", context)
