import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Button } from 'protractor';
import { MessageStandard } from '../../../enums/message-standard.enum';
import { DynamicButton } from '../../../utils/dynamic-button';

export abstract class BaseConfirmationDialog {
  abstract titre: string;
  abstract message :string;
  okBtn: DynamicButton = { key:'ok', caption:"Ok", faClass:'fa-check', btnClass:'btn-primary'};
  cancelBtn :DynamicButton = {key:'cancel', caption:"Annuler", faClass:'fa-undo', btnClass:'btn-secondary'};

  constructor(private modalActive: NgbActiveModal) { }

  onCancel(button:string = ''){
    this.modalActive.dismiss(button);
  }

  onConfirm(button:string=''){
    this.modalActive.close(button);
  }
}
