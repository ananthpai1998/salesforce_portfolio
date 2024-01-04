import { LightningElement, wire, track} from 'lwc';
import getProjectPageTabs from '@salesforce/apex/ProjectPageController.getProjectPageTabs';
import projectCanvas from 'c/projectCanvas';
import projectSourceCodeNavigator from 'c/projectSourceCodeNavigator';

//improvements
//project progress bar

export default class ProjectPageTabs extends LightningElement {

    tabData;
    selectedProjectId;
    selectedProjectName;

    @wire(getProjectPageTabs)
    projectPageTabs({ error, data }){
        if (data) {
            console.log(data);
            this.tabData =  JSON.parse(data);            
        }
        else{
            console.log(error);
        }
    }



    handleViewFullProject(event){
        this.selectedProjectId = event.target.value.projectId;
        this.selectedProjectName = event.target.value.projectName;
        console.log('this.selectedProjectId ',  this.selectedProjectId);
        console.log('this.selectedProjectName ',  this.selectedProjectName);

        this.handleProjectCanvas();
    }

    async handleProjectCanvas() {
        this.result = await projectCanvas.open({
            size: 'large',
            description: 'MiscModal displays the message in a popup',
            header: this.selectedProjectName,
            content:  this.selectedProjectId
        });
    }

    async handleViewSourceCode(event){
        this.selectedProjectName = event.target.value.projectName;
        const projectSourceCodeUnavailabilityMessage = event.target.value.projectSourceCodeUnavailabilityMessage;

        this.result = await projectSourceCodeNavigator.open({
            size: 'small',
            description: 'MiscModal displays the message in a popup',
            header: this.selectedProjectName,
            content:  projectSourceCodeUnavailabilityMessage
        });

    }

}