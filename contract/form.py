# coding=gbk
from django import forms
from django.contrib.auth.models import User
from contract.models import UserProfile


"""
class UserForm(forms.ModelForm):
    
    class Meta:
        model = User
        fields = ('username', 'email', 'password')
        

class UserProfileForm(forms.ModelForm):
    
    class Meta:
        model = UserProfile
        fields = ('website', 'picture')
        """
        
class RegisterForm(forms.Form):
    username = forms.CharField(max_length = 50)
    email = forms.EmailField(max_length = 50)
    password = forms.CharField(min_length=1, max_length=18)
    confirm_password = forms.CharField(min_length=1, max_length=18)

    def clean_username(self):
        username = self.cleaned_data['username']
        res = User.objects.filter(username=username)
        if len(res) != 0:
            raise forms.ValidationError(u'此昵称已经注册，请从新输入')
        return username
    
    def clean_email(self):
        email = self.cleaned_data['email']
        res = User.objects.filter(email=email)
        if len(res) != 0:
            raise forms.ValidationError(u'此邮箱已经注册，请从新输入')
        return email
    
    def clean(self):
        cleaned_data = super(RegisterForm, self).clean()
        password = cleaned_data.get('password')
        confirm_password = cleaned_data.get('confirm_password')
        if password and confirm_password:
            if password != confirm_password:
                raise forms.ValidationError(u'两次密码输入不一致，请重新输入')
