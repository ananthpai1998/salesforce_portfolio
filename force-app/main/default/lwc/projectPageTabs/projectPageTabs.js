import { LightningElement, wire, track} from 'lwc';
import getProjectPageTabs from '@salesforce/apex/ProjectPageController.getProjectPageTabs';
import projectCanvas from 'c/projectCanvas';

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

        this.handleShowModal();
    }

    async handleShowModal() {
        this.result = await projectCanvas.open({
            size: 'large',
            description: 'MiscModal displays the message in a popup',
            header: this.selectedProjectName,
            content:  this.selectedProjectId
        });
    }
}