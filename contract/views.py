# coding=utf-8

from django.http import HttpResponse
from django.template.context import RequestContext
from django.contrib.auth import authenticate, login, logout
from django.shortcuts import render_to_response, render, get_object_or_404
from django.http.response import HttpResponseRedirect, Http404,\
    StreamingHttpResponse, HttpResponseNotFound, HttpResponse
from contract.form import RegisterForm
from contract.models import UserProfile, UserContract, Backlog
from django.contrib.auth.models import User
from django.core.mail import send_mail
import hashlib
import cmd
from lawpact.settings import USER_FILE_PATH, MEDIA_PATH, STATIC_PATH
from django.core.files import File
from django.core.files.base import ContentFile
from django.contrib import auth

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

def guider(request):
    context = RequestContext(request)
    return render_to_response("contract-guider.html", context)

def contract_info(request):
    context = RequestContext(request)
    user = request.user
    #user = auth.get_user(request)
    #contracts = UserContract.objects.all()
    if user is not None:
        contracts = UserContract.objects.filter(user=user)
    return render_to_response("contract-info.html", {'objs' : contracts}, context)


def literature(request):
    context = RequestContext(request)
    return render_to_response("001.html", context)

def user_info(request):
    context = RequestContext(request)
    return render_to_response("user-info.html", context)

def about(request):
    context = RequestContext(request)
    return render_to_response("about.html", context)

import os

def preview_contract(request, offset):
    try:
        offset = int(offset)
    except ValueError:
        raise Http404()
    
    contract = UserContract.objects.get(id=offset, user=request.user)
    #filepath = contract.content
    #print filepath
    #context = RequestContext(request)
    filepath = contract.file.name
    #absolute_path = os.path.join(MEDIA_PATH, filepath)
    filename = os.path.join(MEDIA_PATH, filepath)
    
    import mimetypes
    mimetypes.init()
    
    try:
        fsock = open(filename, "rb")
        file_name = os.path.basename(filename)
        file_size = os.path.getsize(filename)
        print "file size is: " + str(file_size)
        mime_type_guess = mimetypes.guess_type(file_name)
        if mime_type_guess is not None:
            response = HttpResponse(fsock, mimetype=mime_type_guess[0])
        name_for_user = request.user.username + '%' + file_name
        response['Content-Disposition'] = 'attachment; filename=%s' % name_for_user # + file_name
        #print "file_name is: %s, file type is %s" % (file_name, mime_type_guess[0])
    except IOError:
        response = HttpResponseNotFound()
    return response
            
"""
def contract_delete(request, offset):
    print "goes here ok!"
    try:
        offset = int(offset)
    except ValueError:
        raise Http404()
    
    contract = UserContract.objects.get(id=offset, user=request.user)
    if contract is not None:
        print "can delete"
        contract.delete()
    
    return HttpResponseRedirect("/contract-info/");
"""

#delete user contract
from django.views.decorators.csrf import csrf_exempt
@csrf_exempt
def contract_delete(request):
    #print "goes here"
    id = request.POST['id']
    #print "id = %s" % id
    
    contract = UserContract.objects.get(id=id, user=request.user)
    if contract is not None:
        print "contract deleted!!!"
        contract.delete()
    return HttpResponse("delete failed!")

@csrf_exempt
def contract_update_name(request):
    id = request.POST['id']
    new_name = request.POST['name']
    
    print "id=%s" % id
    print "new_name is %s" % new_name
    if len(new_name.strip()) == 0:
        return HttpResponse("input name is empty")

    contract = UserContract.objects.get(id=id, user=request.user)
    if contract is not None:
        contract.name = new_name
        contract.save()
        return HttpResponse('update name success!')
    return HttpResponse('failed to update name!')

@csrf_exempt
def contract_update_law_status(request):
    id = request.POST['id']
    status = request.POST['status']
    new_status = 0
    if status == "1":
        new_status = 1
    
    contract = UserContract.objects.get(id=id, user=request.user)
    if contract is not None:
        law_status = contract.law_status
        print "law_status is: %s" % law_status
        print "new_status is: %s" % new_status
        
        if law_status != new_status:
            contract.law_status = new_status 
            contract.save()
            return HttpResponse('update law status succeed!')
            
    return HttpResponse('update law status failed!')

############################Calender Handling#######################################

@csrf_exempt
def calendar_new(request):
    title = request.POST['title']
    ref = request.POST['ref']
    start_date = request.POST['start']
    end_date = request.POST['end']
    back_color = request.POST['backgroundColor']
    
    user = request.user
    if not user.is_authenticated():
        return HttpResponse("User invalid")

    backlog = Backlog(user=request.user, start_date=start_date, end_date=end_date, back_color=back_color,
                      description = title, contract_name=ref)
    backlog.save()
    
    return HttpResponse("Create new calendar success!!!")

############################update user related info#################################
def update_user_image(request):
    if request.method == 'POST':
        file = request.FILES
        print file
        HttpResponse("OK")
    HttpResponse("fail")

def update_user_info(request):
    if request.method == 'POST':
        if request.user.is_authenticated():
            username = request.user.username
            user = request.user
            
            #radio box info
            property = request.POST.get('property', '')
            
            #check box info
            bianju = request.POST.get('bianju', '')
            daoyan = request.POST.get('daoyan', '')
            yanyuan = request.POST.get('yanyuan', '')
            jingjiren = request.POST.get('jingjiren', '')
            zhipianren = request.POST.get('zhipianren', '')
            cehua = request.POST.get('cehua', '')
            xuanchuan = request.POST.get('xuanchuan', '')
            faxing = request.POST.get('faxing', '')
            fawu = request.POST.get('fawu', '')
            qita = request.POST.get('qita', '')
            
            #company info
            companyname = request.POST.get('companyname', '')
            companyaddress = request.POST.get('companyaddress', '')
            companyemail = request.POST.get('companyemail', '')
            print "company name =%s" % companyname
            print "company address =%s" % companyaddress
            print "company email =%s" % companyemail
            #user = User.objects.filter(id = request.user.id)
            userprofile = UserProfile.objects.get(user = request.user)
            #userprofile = UserProfile(user,)
            userprofile.property = property
            
            userprofile.bianju = bianju
            userprofile.daoyan = daoyan
            userprofile.yanyuan = yanyuan
            userprofile.jingjiren = jingjiren
            userprofile.zhipianren = zhipianren
            userprofile.cehua = cehua
            userprofile.xuanchuan = xuanchuan
            userprofile.faxing = faxing
            userprofile.fawu = fawu
            userprofile.qita = qita
            
            userprofile.company_name = companyname
            userprofile.company_address = companyaddress
            userprofile.company_email = companyemail
            
            userprofile.save()
            
            return HttpResponseRedirect("/user-info/")
    return HttpResponse(u"请求无效")


def reset_password(request):
    if request.method == 'POST':
        origin_password = request.POST['origin-password']
        new_password = request.POST['new-password']
        re_new_password = request.POST['re-new-password']
        
        if new_password != re_new_password:
            return HttpResponse(u"新密码输入不一致");
        username = request.user.username
        user = authenticate(username=username, password=origin_password)
        if user is not None:
            user.set_password(new_password)
            user.save()
            return HttpResponse(u"密码设置成功，请重新登录")
        else:
            return HttpResponse(u"原始密码输入错误")
    return HttpResponse(u"无效页面！")

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
            return render(request, 'register.html', {'form' : rf})
    
    return render(request, 'register.html')

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
from datetime import datetime

def create_contract(request):
    print sys.getdefaultencoding()
    if request.method == 'POST':
        html_content = request.POST['html']
        #print html_content
        if len(html_content) > 0:
            #save as html file
            print "user id is: %d" % request.user.id
            
            timestamp = datetime.now().strftime("%Y%B%d%I%M")
            report_name = USER_FILE_PATH + str(request.user.id) + '/' +timestamp
            html_file_name = report_name + ".html"

            dir = os.path.dirname(html_file_name)
            if not os.path.exists(dir):
                os.makedirs(dir)
            with io.open(html_file_name, "wt", encoding='utf-8') as f:
                f.write(html_content)

            pdf_file_name = report_name + ".pdf"
            cmd = 'wkhtmltopdf ' + html_file_name + ' ' + pdf_file_name
            print cmd
            os.system(cmd)
            
            #Write user table
            user = request.user
            name = u"影视合同"
            content = html_content
            file = open(pdf_file_name, 'r')
            djangofile = File(file)

            user_contract = UserContract(user=user, name=name, content=html_content, type=u'影视合同', contract_status=0, law_status=1)
            #user_contract.save()
     
            file_path = 'files/%s/%s%s' % (user.id, timestamp, '.pdf')
            print file_path
            user_contract.file = file_path #'files/14/upload.pdf'
            user_contract.save()
            #user_contract.file.save(html_file_name, ContentFile(djangofile.read()), save=True)
            #user_contract.file.save(pdf_file_name, djangofile, save=True)
            
            file.close()
            
        #return save_pdf(request, html_content)
        #return HttpResponse(html_content)
        return HttpResponseRedirect('/contract-info/')
    return HttpResponse(u"请求地址无效")
# Just for testing
def test_create(request):
    context = RequestContext(request)
    return render_to_response("001.html", context)
