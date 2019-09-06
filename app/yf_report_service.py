import base64
from suds.client import Client
from django.conf import settings

class YellowfinReportService(object):

    url =  settings.YELLOWFIN_URL+'/services/ReportService?wsdl' 
    client = Client(url)

    def get_report_file(self, username, reqname, report):
        #Yellowfin webserivce request
        report_service_request = {	

            #API user credentials (think of this user like your API key)
            'loginId': 'admin@yellowfin.com.au',
            'password': 'test',
            'orgId': 1,

            #User selected download format (XLSX, CSV, PDF)
            'reportRequest': reqname,

            #Report user credentials. This ensures that security such as access filters can be applied to the result set.
            'reportUserId': username,
            #Name of the report to be called
            'objectName': report
        }
        response = self.client.service.remoteReportCall(report_service_request)        
        file_data= response['binaryData']
        return base64.b64decode(file_data)

    def get_results(self):
        #Yellowfin webserivce request
        report_service_request = {	

            #API user credentials (think of this user like your API key)
            'loginId': 'admin@yellowfin.com.au',
            'password': 'test',
            'orgId': 1,

            #User selected download format (XLSX, CSV, PDF)
            'reportRequest': 'RESULTSET',

            #Name of the report to be called
            'objectName': 'DemographicYear'
        }
        response = self.client.service.remoteReportCall(report_service_request)   
        data=[]
        for row in response['results']:
            data.append(row[0])
        return data