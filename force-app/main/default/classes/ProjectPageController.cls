public without sharing class ProjectPageController {
    
    @AuraEnabled(cacheable=true)
    public static String getProjectPageTabs() {

		list<scope__c> scopeRecords= [Select Id, Name, scope_description__c from scope__c ORDER BY scope_order__c];
        List<Map<String, Object>> result = new List<Map<String, Object>>();

        for (scope__c scopeRecord : scopeRecords) {
            Map<String, Object> recordMap = new Map<String, Object>();
            recordMap.put('Name', scopeRecord.Name);
            recordMap.put('ScopeDescription', scopeRecord.Scope_Description__c);
            recordMap.put('Id', scopeRecord.Id);
            result.add(recordMap);
        }
		return JSON.serialize(result);
    }
}