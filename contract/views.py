# coding=gbk

from django.http import HttpResponse
from django.template.context import RequestContext
from django.contrib.auth import authenticate, login
from django.shortcuts import render_to_response, render
from django.http.response import HttpResponseRedirect

def index(request):
    return HttpResponse("Welcome to LawPact")


def user_login(request):
    context = RequestContext(request)
    error_msg = ""
    if request.method == 'POST':
        print('user authentic')
        username = request.POST['username']
        password = request.POST['password']
        
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
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