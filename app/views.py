"""
Definition of views.
"""
import urllib3
from django.shortcuts import render
from django.http import HttpRequest
from django.http import HttpResponseRedirect
from django.http import HttpResponse
from django.template import RequestContext
from datetime import datetime
from . import yf_admin_service, yf_report_service, nfl_fantasy_service
from .settings_backend import SettingsBackend
from django.contrib.auth import login as auth_login
from django.contrib.auth import logout as auth_logout
from django.contrib.auth import user_logged_in
from django.contrib.auth import authenticate
from django.shortcuts import redirect
from django.contrib.auth.decorators import login_required
from .models import User, CampAccess, Player, PlayerStat, StatDefinition
from django.core.files.temp import NamedTemporaryFile
from app.forms import UserCreationForm, BootstrapAuthenticationForm
from django.conf import settings

AdminService = yf_admin_service.YellowfinAdminService()
ReportService = yf_report_service.YellowfinReportService()
NFLFantasyService = nfl_fantasy_service.NFLFantasyService()

yellowfin_url = settings.YELLOWFIN_URL+'/logon.i4?LoginWebserviceId='
http = urllib3.PoolManager()

#Yellowfin related views


#SSO entry to browse page
@login_required(login_url='/login')
def browse_entry(request):
    assert isinstance(request, HttpRequest)
    token = AdminService.login_user(request.user.email,'BROWSE')
    return HttpResponseRedirect(yellowfin_url+token)

#SSO entry to the new report creation screen.
@login_required(login_url='/login')
def new_report_entry(request):
    assert isinstance(request, HttpRequest)
    token = AdminService.login_user(request.user.email,'NEW_REPORT')
    return HttpResponseRedirect(yellowfin_url+token)

#SSO entry to the new report creation screen.
@login_required(login_url='/login')
def dash_entry(request):
    assert isinstance(request, HttpRequest)
    token = AdminService.login_user(request.user.email,'DASHBOARD')
    return HttpResponseRedirect(yellowfin_url+token)

#SOAP reporting web service - get report as a file
@login_required(login_url='/login')
def get_report(request):

    file_type = request.POST['file_type']
    report = request.POST['report_name']
    file_data = ReportService.get_report_file(request.user.email, file_type, report)
    resp = HttpResponse(file_data, content_type='application/'+file_type.lower()+';charset=UTF-8')
    resp['Content-Disposition'] = "attachment; filename=%s" % report+"."+file_type.lower()
    return resp


#JS API SSO call for dashboard page (dash.html)
@login_required(login_url='/login')
def dashboard(request):
    assert isinstance(request, HttpRequest)
    token = AdminService.login_user(request.user.email, 'JS_API')
    return render(
        request,
        'app/dash.html',
        {
            'title':'Dashboard',
            'token': token,
            'year':datetime.now().year,
        }
    )


#Other views
def home(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    return render(
        request,
        'app/index.html',
        {
            'title':'Home Page',
            'year':datetime.now().year,
        }
    )
@login_required(login_url='/login')
def admin(request):
    """Renders the home page."""
    assert isinstance(request, HttpRequest)
    token = AdminService.login_user(request.user.email,'DASH_IFRAME')
    #token = AdminService.login_user(request.user.email,'ADMIN')
    return render(
        request,
        'app/admin.html',
        {
            'token': token,
            'title':'Home Page',
            'year':datetime.now().year,
        }
    )
def js_call(request):
    if request.method=='GET':
        response=http.request('GET',settings.YELLOWFIN_URL+request.get_full_path())
    print(response.status)
    print(response.data)
    r = HttpResponse(response.data)
    return r

def logout(request):
    auth_logout(request)
    return HttpResponseRedirect("/")


def login(request):
    assert isinstance(request, HttpRequest)
    if request.method=='GET':
        return render(
            request,
            'app/login.html',
            {
                'form': BootstrapAuthenticationForm,
                'title':'Home Page',
                'year':datetime.now().year,
            }
    )   
    if request.method == 'POST':
        email = request.POST['email']
        password = request.POST['password']
        user = authenticate(email=email, password=password)
        if user is not None:
            if user.is_active:
                request.session.set_expiry(86400) #sets the exp. value of the session 
                auth_login(request, user) #the user is now logged in
                token = AdminService.login_user(request.user.email,'JS_API')
                return render(
                    request,
                    'app/dash.html',
                    {
                        'title':'About',
                        'token': token,
                        'year':datetime.now().year,
                    }
                )
            else:
                error="not active"
        else:
            error="Invalid Username or Password"
        return render(
            request,
            'app/login.html',
            {
                'form': BootstrapAuthenticationForm,
                'error': error,
                'title':'Home Page',
                'year':datetime.now().year,
            }
            )
@login_required(login_url='/login')
def add_user(request):
    assert isinstance(request, HttpRequest)
    if request.method=='GET':
        return render(
            request,
            'app/new_user.html',
            {
                'title':'Add User',
                'form': UserCreationForm,
            }
        )
    if request.method=='POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            email= form.cleaned_data.get('email')
            role = form.cleaned_data.get('role')
            pw=form.cleaned_data.get('password')
            camps=form.cleaned_data.get('camps')
        else:
            #If form not valid, return form with errors
            return render(
                request,
                'app/new_user.html',
                {
                    'title':'Add User',
                    'form': form,
                })

        #Create Ski Manager user.
        user=User()
        user.email= email
        user.set_password(pw)
        user.role = role
        user.save()

        #Add access filter values to table. With "refresh on new user" enabled in the access fitler, this will automatically update when the user is creatd
        for camp in camps:
            al = CampAccess(email=request.POST['email'], camp=camp)
            al.save()

        #Create Yellowfin User. 
        AdminService.create_user(user.email,user.role)
        #Add User to Yellowfin User Group
        AdminService.add_user_to_group(user.email,user.role)

        return render(
                    request,
                    'app/login.html',
                    {
                        'form': BootstrapAuthenticationForm,
                        'title':'Login',
                        'year':datetime.now().year,
                    }
            )     


@login_required(login_url='/login')
def user_portal(request):
    assert isinstance(request, HttpRequest)

    #token = AdminService.login_user(request.user.email, 'JS_API')
    #tab = request.POST.get('tab')
    #resultset=''
    #if (tab == 'SOAP Report Services'):
    #    resultset= ReportService.get_results()
    #if (tab == None):
    #    tab = 'JavaScript API'
    return render(
        request,
        'app/user_portal.html',
        {
            'title':'Portal',
            'year':datetime.now().year,
        }
    )

def detail(request, acme_data):
    content = acme_data+".zVcA9SCBH0zCMWhRfeINbL5KAt1sr1OJvvKdkcos9LU"
    response = HttpResponse(content, content_type='text/plain')
    response['Content-Disposition'] = 'attachment; filename={0}'.format(acme_data)
    return response

def yfRedirect(request):
    return HttpResponseRedirect(yellowfin_url)

def getWeekData(request):
    season = 2018
    for season in range(2018, 2020):
        for week in range(1,18):   
            print(str(week)+", "+str(season))
            success = NFLFantasyService.getWeekStats(season, week)
    content = "Save Successful"
    response = HttpResponse(content, content_type='text/plain')
    return response
def getStatDefinitions(request):
    NFLFantasyService.getStatDefinitions()
    content = "Save Successful"
    response = HttpResponse(content, content_type='text/plain')
    return response