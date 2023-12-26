public without sharing class ProjectPageController {
    
    @AuraEnabled(cacheable=true)
    public static String getProjectPageTabs() {
		//do error handing 
        
        list<project__c> projectRecords = new list<project__c>([Select Id, Name, scope__c, project_category__r.Id, project_description__c from project__c]);
        //cat Id    project list project details
        Map<Id, list<Map<String, Object>>> categoryToProjectsMap = new Map<Id, list<Map<String, Object>>>();
        
        for (project__c projectRecord : projectRecords){   
            if (categoryToProjectsMap.containsKey(projectRecord.project_category__r.Id)){
                Map<String, Object> projectMap = new Map<String, Object>();
                projectMap.put('projectId', projectRecord.Id);
                projectMap.put('projectName', projectRecord.Name);
                projectMap.put('projectDescription', projectRecord.project_description__c);
				categoryToProjectsMap.get(projectRecord.project_category__r.Id).add(projectMap);
            }
            else{
                Map<String, Object> projectMap = new Map<String, Object>();
                projectMap.put('projectId', projectRecord.Id);
                projectMap.put('projectName', projectRecord.Name);
                projectMap.put('projectDescription', projectRecord.project_description__c);
                list<Map<String, Object>> projectList = new list<Map<String, Object>>();
                projectList.add(projectMap);
                categoryToProjectsMap.put(projectRecord.project_category__r.Id, projectList);
            }
        }
        
        list<project_category__c> projectCategoryRecords = new list<project_category__c>([Select Id, Name, scope__r.Id, category_description__c  from project_category__c]);
        Map<Id, list<Map<String, Object>>> scopeToCategoryMap = new  Map<Id, list<Map<String, Object>>>();
            
        for (project_category__c projectCategoryRecord : projectCategoryRecords){
            
            if (scopeToCategoryMap.containsKey(projectCategoryRecord.scope__r.Id)){
                Map<String, Object> categoryMap = new Map<String, Object>();
                categoryMap.put('categoryId', projectCategoryRecord.Id);
                categoryMap.put('categoryName', projectCategoryRecord.Name);
                categoryMap.put('categoryDescription', projectCategoryRecord.category_description__c);
                categoryMap.put('projects', categoryToProjectsMap.get(projectCategoryRecord.scope__r.Id));
                scopeToCategoryMap.get(projectCategoryRecord.scope__r.Id).add(categoryMap);
            }
            else{
                Map<String, Object> categoryMap = new Map<String, Object>();
                categoryMap.put('categoryId', projectCategoryRecord.Id);
                categoryMap.put('categoryName', projectCategoryRecord.Name);
                categoryMap.put('categoryDescription', projectCategoryRecord.category_description__c);
                categoryMap.put('projects', categoryToProjectsMap.get(projectCategoryRecord.Id));
                list<Map<String, Object>> categoryList = new list<Map<String, Object>>();
                categoryList.add(categoryMap);
                scopeToCategoryMap.put(projectCategoryRecord.scope__r.Id, categoryList);
            }
        }
        
        list<scope__c> scopeRecords= new list<scope__c>([Select Id, Name, scope_description__c from scope__c ORDER BY scope_order__c]);
        List<Map<String, Object>> result = new List<Map<String, Object>>();
        for (scope__c scopeRecord : scopeRecords) {
            Map<String, Object> recordMap = new Map<String, Object>();
            recordMap.put('Name', scopeRecord.Name);
            recordMap.put('ScopeDescription', scopeRecord.Scope_Description__c);
            recordMap.put('Id', scopeRecord.Id);
            recordMap.put('categories', scopeToCategoryMap.get(scopeRecord.Id));
            result.add(recordMap);
        }
        
		return JSON.serialize(result);
    }
}