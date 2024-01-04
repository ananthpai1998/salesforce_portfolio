public without sharing class projectCanvasController {
    @AuraEnabled(cacheable=true)
    public static String getProjectDetails(String recordId){
        System.debug('recordId '+ recordId);          
        list<project__c> projectRecordList = new list<project__c>([Select Id, Name, project_display_details__c, (Select Id, Name, version_improvements__c, project_version_number__c, api__c from project_versions__r where active__c = True ORDER BY project_version_number__c)  from project__c where Id = :recordId]);
        list<map<String, Object>> projectRecordResult = new list<map<String, Object>>();
        if (projectRecordList.size() > 0) {
            System.debug('projectRecordList '+  projectRecordList);
            for(project__c projectRecord : projectRecordList){
                map<String, Object> projectRecordMap = new map<String, Object>();
                projectRecordMap.put('projectId', projectRecord.Id);
                projectRecordMap.put('projectDisplayDetails', projectRecord.project_display_details__c);
                List<project_version__c> projectVersionRecords = projectRecord.Project_Versions__r;   
                if(projectVersionRecords.size() > 0){
                    list<map<String, Object>> projectVersionResult = new list<map<String, Object>>();
                    for(project_version__c projectVersionRecord :projectVersionRecords){
                        map<String, Object> projectVersionMap = new  map<String, Object>();
                        projectVersionMap.put('Id', projectVersionRecord.Id);
                        projectVersionMap.put('Name', projectVersionRecord.Name);
                        projectVersionMap.put('projectVersionNumber', projectVersionRecord.project_version_number__c);
                        projectVersionMap.put('versionImprovements', projectVersionRecord.version_improvements__c);
                        projectVersionMap.put('versionAPI', projectVersionRecord.api__c);
                        projectVersionResult.add(projectVersionMap);    
                    }
                    projectRecordMap.put('projectVersion', projectVersionResult);                    
                }
                projectRecordResult.add(projectRecordMap);
            }
        }
        System.debug('projectRecordResult ' + projectRecordResult);
        return JSON.serialize(projectRecordResult);
    }
    
    // @AuraEnabled(cacheable=true)
    // public static String getAPIResponse(){
		
    //     Project_Version__c gcpURLRecord = [Select api__c from Project_Version__c where Id = 'a022w00000wIbCvAAK'];
    //     Http http = new Http();
	// 	HttpRequest request = new HttpRequest();
	// 	request.setEndpoint('https://generatehandwrittendigit-umgqvjytea-uc.a.run.app/tryAgain?');
	// 	request.setMethod('GET');
	// 	HttpResponse response = http.send(request);
        
	// 	System.debug('response '+ response.getBody());
	// 	return JSON.serialize(response.getBody());
        
    // }
    
}