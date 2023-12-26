import { api, track, wire , LightningElement  } from 'lwc';
import LightningModal from 'lightning/modal';
import getProjectDetails from '@salesforce/apex/projectCanvasController.getProjectDetails';

export default class ProjectCanvas extends LightningModal  {


    @api header;
    @api content;



    @wire(getProjectDetails)
    projectDetails({ error, data }){
        if (data) {
            console.log(data)    
            this.content = data
        }
        else{
            console.log(error)
        }
    }


    
    handleClose() {
        this.close('return value');
    }

}