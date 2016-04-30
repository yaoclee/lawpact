# coding=gbk

from django.http import HttpResponse
from django.template.context import RequestContext
from django.contrib.auth import authenticate, login
from django.shortcuts import render_to_response, render
from django.http.response import HttpResponseRedirect
from contract.form import RegisterForm
from contract.models import UserProfile
from django.contrib.auth.models import User

def index(request):
    return HttpResponse("Welcome to LawPact")

def user_login(request):
    #context = RequestContext(request)
    error_msg = ""
    if request.method == 'POST':
        username = request.POST['username']
        password = request.POST['password']
        
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                print "login success!"
                login(request, user) #produce session
                #return render(request, 'contract/index.html')
                return HttpResponseRedirect('/')
            else:
                error_msg = "User was not active!"
                #return render(request, "User account is disabled!")
        else:
            print "Invalid login details: {0}, {1}".format(username, password)
            error_msg = "Wrong username or password!"
            #render(request, "Invalid detailed provided.")
    return render(request, 'contract/login.html', {'err_msg' : error_msg})

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
            username = dt.get('username')
            email = dt.get('email')
            password = dt.get('password')
            user = User.objects.create_user(username, email, password) 
            if user is not None:
                user.save()
                print "success to register"
            else:
                print "failed to register"

            user_profile = UserProfile(user=user,)
            user_profile.save()
            
            msg = "注册成功，请登录"
            return render(request, 'contract/regSuccess.html')
        else:
            return render(request, 'contract/register.html', {'form' : rf})
    
    return render(request, 'contract/register.html')