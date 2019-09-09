from suds.client import Client
from django.conf import settings
import random
import string
class YellowfinAdminService(object):

    url = settings.YELLOWFIN_URL+'/services/AdministrationService?wsdl'
    client = None
    def __init__(self): 
        try:
            self.client = Client(self.url)
        except:
            print("could not connect to Yellowfin")
    def login_user(self, username, entry):

        #User to be logged in
        person = {
            'userId': 'admin@yellowfin.com.au',
        }

        #Conrtol what the user sees when they login
        entry_parameters = {
            'BROWSE' : ['ENTRY=BROWSE','YFTOOLBAR=FALSE'],
            'NEW_REPORT' : ['ENTRY=CREATEREPORT','YFTOOLBAR=FALSE'],
            'JS_API' : [],
            'ADMIN' : ['ENTRY=ADMINISTRATION','YFTOOLBAR=FALSE','HIDEHEADER=TRUE','YFTOOLBAR=FALSE'],
            'DASHBOARD' : ['ENTRY=VIEWDASHBOARD','DASHBOARDUUID=1e68d9cc-fa5a-44e2-816d-782aa40ceeae', 'YFTOOLBAR=FALSE'],
            'PLAYERSUMMARY' : ['ENTRY=VIEWREPORT','REPORTUUID=431ca0c1-514a-403b-b44f-281f14485359','HIDEHEADER=TRUE','YFTOOLBAR=FALSE']
        }

        #Yellowfin webserivce request
        admin_service_request = {	

            #API user credentials (think of this user like your API key)
            'loginId': 'admin@yellowfin.com.au',
            'password': 'test',
            'orgId': 1,

            #Web serivce call
            'function': 'LOGINUSERNOPASSWORD',

            #Call specific components
            'person': person,
            'orgRef': '%',
            'parameters' : entry_parameters[entry]
        }

        response = self.client.service.remoteAdministrationCall(admin_service_request)        
        login_session_id = response['loginSessionId']
        return login_session_id

    def create_user(self, username, role):
        roles={
            'CONSUMER': 'YFREPORTCONSUMER',
            'MANAGER': 'YFREPORTWRITER',
            'ADMIN': 'YFADMIN'}
        #User to be created
        person = {
            'userId': username,
            'emailAddress': username,
            'password': ''.join(random.choice(string.ascii_uppercase + string.digits) for _ in range(8)),
            'firstName': username.split("@")[0],
            'lastName': username.split("@")[1],
            'roleCode':roles[role]
        }
        admin_service_request = {	
            'loginId': 'admin@yellowfin.com.au',
            'password': 'test',
            'orgId': 1,

            'function': 'ADDUSER',

            'person': person,
        } 
        response = self.client.service.remoteAdministrationCall(admin_service_request)        
    def add_user_to_group(self, username, role):
        groups = {
            'ADMIN' : 'Integration Admin Users',
            'CONSUMER' : 'Integration Read Users'
        }
        person = {
            'userId' : username,
        }
        group = {
            'groupName' : groups[role],
        }
        admin_service_request = {	
            'loginId': 'admin@yellowfin.com.au',
            'password': 'test',
            'orgId': 1,

            'function': 'INCLUDEUSERINGROUP',

            'person': person,
            'group': group
        } 
        response = self.client.service.remoteAdministrationCall(admin_service_request)                
