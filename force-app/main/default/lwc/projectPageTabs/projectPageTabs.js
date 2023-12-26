import { LightningElement, wire, track} from 'lwc';
import getProjectPageTabs from '@salesforce/apex/ProjectPageController.getProjectPageTabs';
import MyModal from 'c/myModal';


export default class ProjectPageTabs extends LightningElement {

    tabData;
    selectedProjectId;


    @wire(getProjectPageTabs)
    projectPageTabs({ error, data }){
        if (data) {
            console.log(data)    
            this.tabData =  JSON.parse(data);
            //need to fix this
            this.activeAccordionSection  =  this.tabData[0].categories[0].categoryName;
            console.log('this.activeAccordionSection: ', this.activeAccordionSection);
            
        }
        else{
            console.log(error)
        }
    }

    handleViewFullProject(event){
        this.selectedProjectId = event.target.value;
        console.log('this.selectedProjectId ', this.selectedProjectId)
        this.handleShowModal()
    }

    async handleShowModal() {
        
        this.result = await MyModal.open({
            size: 'full',
            description: 'MiscModal displays the message in a popup',
            header: 'test',
            content: this.selectedProjectId
        });
    }

}