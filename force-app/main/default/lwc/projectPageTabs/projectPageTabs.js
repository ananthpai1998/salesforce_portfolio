import { LightningElement, wire, track} from 'lwc';
import getProjectPageTabs from '@salesforce/apex/ProjectPageController.getProjectPageTabs';
import projectCanvas from 'c/projectCanvas';
import getProjectDetails from '@salesforce/apex/projectCanvasController.getProjectDetails';


export default class ProjectPageTabs extends LightningElement {

    tabData;
    selectedProjectDetails;

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
        this.selectedProjectId = event.target.value;
        console.log('this.selectedProjectId ',  this.selectedProjectId);
        this.handleShowModal();
    }

    async handleShowModal() {
        this.result = await projectCanvas.open({
            size: 'large',
            description: 'MiscModal displays the message in a popup',
            header: 'test',
            content:  this.selectedProjectDetails
        });
    }
}