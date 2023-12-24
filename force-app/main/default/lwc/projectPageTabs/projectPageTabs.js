import { LightningElement, wire, track} from 'lwc';
import getProjectPageTabs from '@salesforce/apex/ProjectPageController.getProjectPageTabs';


export default class ProjectPageTabs extends LightningElement {

    tabData;
    activeAccordionSection;

    @wire(getProjectPageTabs)
    projectPageTabs({ error, data }){
        if (data) {
            console.log(data)
            
            
            this.tabData =  JSON.parse(data);
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

}