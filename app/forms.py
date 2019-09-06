"""
Definition of forms.
"""

from django import forms
from django.contrib.auth.forms import AuthenticationForm
from django.utils.translation import ugettext_lazy as _
from django.contrib import admin
from django.contrib.auth.models import Group
from django.contrib.auth.admin import UserAdmin as BaseUserAdmin
from django.contrib.auth.forms import ReadOnlyPasswordHashField

from .models import User


class UserCreationForm(forms.ModelForm):
    """A form for creating new users. Includes all the required
    fields, plus a repeated password."""
    email = forms.CharField(max_length=254,
                            widget=forms.TextInput({
                                'class': 'form-control',
                                'placeholder': 'Email'}))
    password = forms.CharField(label='Password', widget=forms.PasswordInput({'class': 'form-control'}))
    CAMP_OPTIONS = (
                (12578,"Whistler"),
                (12355,"Mt Hood Meadows"),
                (12263,"Oz Ski"),
                (12674,"Mt Buller Camp"),
                (12569,"Wanlong"),
                (12322,"Coronet Peak"),
                (12348,"Morioka Shizukuishi"),
                (12474,"Happo-one Hakuba"),
                (12556,"Tonale"),
                (12693,"Platypus Camp"),
                (12387,"Padola"),
                (12539,"Livigno")
                )
    ROLE_OPTIONS = (
                ("CONSUMER","Read Only"),
                ("ADMIN","Admin")
        )
    role = forms.ChoiceField(label='Forms ',widget=forms.Select({'class': 'form-control'}),
                                             choices=ROLE_OPTIONS)

    camps = forms.MultipleChoiceField(label='Forms ',widget=forms.SelectMultiple({'class': 'form-control'}),
                                             choices=CAMP_OPTIONS)
    class Meta:
        model = User
        fields = ('email','password','role','camps')



class BootstrapAuthenticationForm(AuthenticationForm):
    """Authentication form which uses boostrap CSS."""
    email = forms.CharField(max_length=254,
                               widget=forms.TextInput({
                                   'class': 'form-control',
                                   'placeholder': 'Email'}))
    password = forms.CharField(label=_("Password"),
                               widget=forms.PasswordInput({
                                   'class': 'form-control',
                                   'placeholder':'Password'}))
