import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Button } from 'protractor';
import { MessageStandard } from '../../../enums/message-standard.enum';
import { DynamicButton } from '../../../utils/dynamic-button';

@Component({
  selector: 'app-delete-confirmation-dialog',
  templateUrl: './delete-confirmation-dialog.component.html',
  styleUrls: ['./delete-confirmation-dialog.component.css']
})
export class DeleteConfirmationDialogComponent implements OnInit {
  message :string = MessageStandard.ask_del;
  okBtn: DynamicButton = {caption:"Oui", faClass:'fa-check', btnClass:'btn-danger'};
  cancelBtn :DynamicButton = {caption:"Non", faClass:'fa-undo', btnClass:'btn-secondary'};

  constructor(private modalActive: NgbActiveModal) { }

  ngOnInit() {
  }

  onCancel(button:string = ''){
    this.modalActive.dismiss(button);
  }

  onConfirm(button:string=''){
    this.modalActive.close(button);
  }
}
