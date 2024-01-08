import { LightningElement, wire } from 'lwc';
import { CurrentPageReference } from 'lightning/navigation';
import getProjectDetails from '@salesforce/apex/ProjectDetailDisplayController.getProjectDetails';
import { NavigationMixin } from "lightning/navigation";


export default class projectDetailDisplay extends NavigationMixin(LightningElement) {

    displayContents
    iframeLoading = true;

    @wire(CurrentPageReference)
    getStateParameters(currentPageReference) {
       if (currentPageReference) {
            if(currentPageReference.state?.recordId){
                console.log(currentPageReference.state?.recordId)
                getProjectDetails({recordId: currentPageReference.state?.recordId})
                .then((result) => {
                console.log('result '+ result);
                this.displayContents = JSON.parse(result);
                console.log('this.displayContent '+ this.displayContents);
                })
                .catch((error) => {
                    this.error = error;
                }); 
            }else{
                console.log('recordId is not present not URL !!!')
            }
        }
    }



    handleGoBack(){
        this[NavigationMixin.Navigate](
            {
              type: "standard__webPage",
              attributes: {
                url: "/ananthHome/s/projects",
              },
            },
            true, // Replaces the current page in your browser history with the URL
          );
    }

    handleIframeLoad(){
        this.iframeLoading = false
        console.log("content loaded !!")
    }


}