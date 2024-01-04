import { api, track, wire , LightningElement  } from 'lwc';
import LightningModal from 'lightning/modal';
import getProjectDetails from '@salesforce/apex/projectCanvasController.getProjectDetails';
// import getAPIResponse from '@salesforce/apex/projectCanvasController.getAPIResponse';

//Improvements Needed
//Spinner during initial load
//Project Improvement section
//show only what is needed, so put temp:if:true for all sections

export default class ProjectCanvas extends LightningModal  {


    @api header;
    @api content;

    displayContents;

    //urllink = 'https://generatehandwrittendigit-umgqvjytea-uc.a.run.app/tryAgain?'; https://generateimages-umgqvjytea-uc.a.run.app/?user_input=1

    connectedCallback(){
      console.log('this.content ', this.content)
      getProjectDetails({recordId: this.content})
      .then((result) => {
        console.log('result '+ result);
        this.displayContents = JSON.parse(result);
        console.log('this.displayContent '+ this.displayContents);
      })
      .catch((error) => {
        this.error = error;
      }); 

    }
    
    handleIframeLoad(){
      console.log('Content Loaded !!');
    }

    handleClose() {
        this.close('return value');
    }

}