public without sharing class projectCanvasController {
    @AuraEnabled(cacheable=true)
    public static String getProjectDetails(String recordId){
        return 'Hello World';
    }

    public class projectDetails{
        String projectHeader;
        list<map<String, Object>> projectContent = new list<map<String, Object>> ();

        public projectDetails(String projectHeader,  list<map<String, Object>> projectContent){
            this.projectHeader = projectHeader;
            this.projectContent = projectContent;

        }
    }
    

}