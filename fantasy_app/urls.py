"""
Definition of urls for fantasy_app.
"""

from datetime import datetime
from django.conf.urls import url
import django.contrib.auth.views
from django.contrib.auth import logout
from django.contrib.auth import login
from django.conf.urls.static import static
from django.conf import settings
from django.urls import include
import app.forms
import app.views

# Uncomment the next lines to enable the admin:
# from django.conf.urls import include
# from django.contrib import admin
# admin.autodiscover()

urlpatterns = [
    # Examples:
    url(r'^$', app.views.home, name='home'),
    url(r'^admin', app.views.admin, name='admin'),
    url(r'^browse_entry', app.views.browse_entry, name='browse_entry'),
    url(r'^new_report_entry', app.views.new_report_entry, name='new_report_entry'),
    url(r'^dash_entry', app.views.dash_entry, name='dash_entry'),
    url(r'^user_portal', app.views.user_portal, name='user_portal'),
    url(r'^get_report', app.views.get_report, name='get_report'),
    url(r'^add_user', app.views.add_user, name='add_user'),
    url(r'^login$', app.views.login, name='login'),
    url(r'^dashboard', app.views.dashboard, name='dashboard'),
    url(r'^JsAPI$', app.views.js_call, name='JsAPI'),
    url(r'^admin', app.views.admin, name='admin'),
    url(r'^logout$', app.views.logout, name='logout'),
   
    url(r'^\.well-known/acme-challenge/(?P<acme_data>.+)$', app.views.detail, name='detail'),
    url(r'^static/(?P<path>.*)$', django.views.static.serve, {'document_root': settings.MEDIA_ROOT, 'show_indexes': True}),
    
    #Data scrape
    url(r'^getWeekData$', app.views.getWeekData, name='getWeekData'),  
    url(r'^getStatDefinitions$', app.views.getStatDefinitions, name='getStatDefinitions'),

    #Fantasy REST Endpoints
    url(r'^addPlayer$', app.views.addPlayer, name='addPlayer'),  
    url(r'^removePlayer$', app.views.removePlayer, name='removePlayer'), 
    url(r'^getPlayers$', app.views.getPlayers, name='getPlayers'),  
    url(r'^getAllPlayers$', app.views.getAllPlayers, name='getAllPlayers'), 
]
