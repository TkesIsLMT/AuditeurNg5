import { Component } from '@angular/core';
import { extend } from 'webdriver-js-extender';
import { BaseConfirmationDialog } from './base-confirmation-dialog';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { DynamicButton } from '../../../utils/dynamic-button';
import { MessageStandard } from '../../../enums/message-standard.enum';

@Component({
  selector: 'app-desactivate-confirmation-dialog',
  templateUrl: './base-confirmation-dialog.component.html',
  styleUrls: ['./base-confirmation-dialog.component.css']
})
export class DesactivateConfirmationDialogComponent extends BaseConfirmationDialog {
  titre :string = "Désactivation";
  message :string = MessageStandard.ask_desactivate;
  okBtn: DynamicButton = {key:'ok',caption:"Oui", faClass:'fa-check', btnClass:'btn-warning'};
  cancelBtn :DynamicButton = {key:'cancel',caption:"Non", faClass:'fa-undo', btnClass:'btn-secondary'};

  constructor(mdSrv:NgbActiveModal) {
    super(mdSrv);
  }

}
