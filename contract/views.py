# coding=gbk

from django.http import HttpResponse
from django.template.context import RequestContext
from django.contrib.auth import authenticate, login
from django.shortcuts import render_to_response, render
from django.http.response import HttpResponseRedirect

def index(request):
    return HttpResponse("Welcome to LawPact")


def user_login(request):
    #context = RequestContext(request)
    if request.method == 'POST':
        print('user authentic')
        return render(request, 'contract/index.html')
    else:
        return render(request, 'contract/login.html')

        """
        username = request.POST['username']
        password = request.POST['password']
        
        user = authenticate(username=username, password=password)
        if user is not None:
            if user.is_active:
                login(request, user)
                return render(request, 'contract/index.html')
                #return HttpResponseRedirect('/')
            else:
                return HttpResponse("User account is disabled!")
        else:
            print "Invalid login details: {0}, {1}".format(username, password)
            HttpResponse("Invalid detailed provided.")
    else:
        return render_to_response('contract/login.html', {}, context)
        """