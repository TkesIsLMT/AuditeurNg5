import { Component } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Button } from 'protractor';
import { MessageStandard } from '../../../enums/message-standard.enum';
import { DynamicButton } from '../../../utils/dynamic-button';
import { BaseConfirmationDialog } from './base-confirmation-dialog';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './base-confirmation-dialog.component.html',
  styleUrls: ['./base-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent extends BaseConfirmationDialog {
  titre :string = "Suppression";
  message :string = MessageStandard.ask_del;
  okBtn: DynamicButton = {key:'ok', caption:"Oui", faClass:'fa-check', btnClass:'btn-danger'};
  cancelBtn :DynamicButton = {key:'cancel',caption:"Non", faClass:'fa-undo', btnClass:'btn-secondary'};

  constructor(modalActive: NgbActiveModal) { 
    super(modalActive);
  }
}
