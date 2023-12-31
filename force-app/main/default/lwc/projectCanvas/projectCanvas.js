import { api, track, wire , LightningElement  } from 'lwc';
import LightningModal from 'lightning/modal';
import getProjectDetails from '@salesforce/apex/projectCanvasController.getProjectDetails';
import getAPIResponse from '@salesforce/apex/projectCanvasController.getAPIResponse';

//Improvements Needed
//Spinner during initial load
//Project Improvement section
//show only what is needed, so put temp:if:true for all sections

export default class ProjectCanvas extends LightningModal  {


    @api header;
    @api content;

    displayContents;
    getAPIResponse;

    urllink = 'https://generatehandwrittendigit-umgqvjytea-uc.a.run.app/tryAgain?';

    connectedCallback(){

        //this.template.querySelector('iframe').src = this.urllink;
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

      console.log('Sending API request')

      // getAPIResponse()
      // .then((result) => {
      //   console.log('result '+ result);
      //   this.getAPIResponse = JSON.parse(result);
      //   console.log(' this.getAPIResponse '+  this.getAPIResponse);
      // })
      // .catch((error) => {
      //   this.error = error;
      // });

    }
    
    handleClose() {
        this.close('return value');
    }

}