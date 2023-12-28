import { api, track, wire , LightningElement  } from 'lwc';
import LightningModal from 'lightning/modal';
import getProjectDetails from '@salesforce/apex/projectCanvasController.getProjectDetails';

export default class ProjectCanvas extends LightningModal  {


    @api header;
    @api content;

    displayContent;

    connectedCallback(){
        console.log('this.content ', this.content)

        getProjectDetails({recordId: this.content})
      .then((result) => {
        this.displayContent = result;
        console.log('this.displayContent '+ this.displayContent);
      })
      .catch((error) => {
        this.error = error;
      });

    }



    
    handleClose() {
        this.close('return value');
    }

}