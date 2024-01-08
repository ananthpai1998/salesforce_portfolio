import { LightningElement, wire, track} from 'lwc';
import { NavigationMixin } from "lightning/navigation";
import getProjectPageTabs from '@salesforce/apex/ProjectPageController.getProjectPageTabs';
import projectCanvas from 'c/projectCanvas';
import projectSourceCodeNavigator from 'c/projectSourceCodeNavigator';

//improvements
//project progress bar

export default class ProjectPageTabs extends NavigationMixin(LightningElement) {

    tabData;
    // selectedProjectId;
    // selectedProjectName;

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
        console.log('navigating to', "/ananthHome/s/projects/project-detail?recordId="+event.target.value.projectId)
        this[NavigationMixin.Navigate](
            {
              type: "standard__webPage",
              attributes: {
                url: "/ananthHome/s/projects/project-detail?recordId="+event.target.value.projectId,
              },
            },
            true, // Replaces the current page in your browser history with the URL
          );

        // this.selectedProjectId = event.target.value.projectId;
        // this.selectedProjectName = event.target.value.projectName;
        // console.log('this.selectedProjectId ',  this.selectedProjectId);
        // console.log('this.selectedProjectName ',  this.selectedProjectName);

        // this.handleProjectCanvas();
        }
        
    // async handleProjectCanvas() {
    //     this.result = await projectCanvas.open({
    //         size: 'large',
    //         description: 'MiscModal displays the message in a popup',
    //         header: this.selectedProjectName,
    //         content:  this.selectedProjectId
    //     });
    // }

    async handleViewSourceCode(event){
        // this.selectedProjectName = event.target.value.projectName;
        // const projectSourceCodeUnavailabilityMessage = event.target.value.projectSourceCodeUnavailabilityMessage;

        this.result = await projectSourceCodeNavigator.open({
            size: 'small',
            description: 'MiscModal displays the message in a popup',
            header: event.target.value.projectName,
            content:  event.target.value.projectSourceCodeUnavailabilityMessage
        });

    }

}