import { LightningElement, wire } from 'lwc';
import getProjectPageTabs from '@salesforce/apex/ProjectPageController.getProjectPageTabs';


export default class ProjectPageTabs extends LightningElement {

    tabData;

    @wire(getProjectPageTabs)
    projectPageTabs({ error, data }){
        if (data) {
            console.log(data)
            this.tabData =  JSON.parse(data);
        }
        else{
            console.log(error)
        }
    }

}