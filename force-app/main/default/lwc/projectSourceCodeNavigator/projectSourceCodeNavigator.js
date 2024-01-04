import { api, track, wire , LightningElement  } from 'lwc';
import LightningModal from 'lightning/modal';

export default class projectSourceCodeNavigator extends LightningModal {

    @api header;
    @api content;

    handleClose() {
        this.close('return value');
    }

}