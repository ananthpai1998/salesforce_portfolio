import { LightningElement, wire, track} from 'lwc';
import getProjectPageTabs from '@salesforce/apex/ProjectPageController.getProjectPageTabs';
import MyModal from 'c/myModal';


export default class ProjectPageTabs extends LightningElement {

    tabData;
    activeAccordionSection;
    content = 'The modal content';
    header = 'The modal header';


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

    handleAccordionSection(event){
        this.activeAccordionSection = event.detail.name;
    }

    async handleShowModal() {
        this.result = await MyModal.open({
            size: 'small',
            description: 'MiscModal displays the message in a popup',
            header: this.header,
            content: this.content
        });
    }

}