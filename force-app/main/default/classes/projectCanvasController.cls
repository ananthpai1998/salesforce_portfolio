public without sharing class projectCanvasController {
    @AuraEnabled(cacheable=true)
    public static String getProjectDetails(){
        return 'Hello World';
    }

}