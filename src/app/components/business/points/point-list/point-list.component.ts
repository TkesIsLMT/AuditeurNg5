import { Component, OnInit } from "@angular/core";
import { PointDataSource } from "../point-data-source";
import { MessageService } from "../../../../services/message.service";
import { PointService } from "../point.service";
import { GlobalInfo } from "../../../../services/global-info.service";
import { ReferentielListBaseComponent } from "../../../tools/referentiel-utils/referentiel-list-base-component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { PointDetail } from "../point-detail";
import { DynamicButton } from "../../../../utils/dynamic-button";
import { MessageStandard } from "../../../../enums/message-standard.enum";
import { PointEditComponent } from "../point-edit/point-edit.component";
import { DeleteConfirmationDialogComponent } from "../../../layout/delete-confirmation-dialog/delete-confirmation-dialog.component";
import * as _ from 'lodash';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.css',
  '../../../tools/referentiel-utils/referentiel-style.css']
})
export class PointListComponent extends ReferentielListBaseComponent implements OnInit  {
  dataSource :PointDataSource;
  currentPoint: PointDetail = new PointDetail();
  addBtn: DynamicButton;

  private getPoint$: Observable<PointDetail>;

  constructor(private msg: MessageService, private pointSrv: PointService, private globals: GlobalInfo,
      private modalService: NgbModal, private translate: TranslateService) { 
    super();
    this.addBtn = { caption: '...', faClass: 'fas fa-plus', btnClass: 'btn btn-sm btn-primary', visible: true };
    this.translate.get('point.liste.ajouter').subscribe(res=>this.addBtn.caption=res);
  }

  onRowClick(item){
    this.currentPoint = item;
  }
  ngOnInit() {
    this.dataSource = new PointDataSource(this.pointSrv,this.globals);
    this.loadPage();
  }

  askDelete(item){
    const confirm = this.modalService.open(DeleteConfirmationDialogComponent);
    confirm.result.then(x=> this.delete(item),()=>{/*rien à faire si l'utilisateur annule la suppression !*/});
  }

  private delete(item){
    this.pointSrv.deletePoint(item.Id).subscribe(
      ()=>this.majReussiCb(MessageStandard.del_ok,true),
      ()=>this.msg.error(MessageStandard.del_nok));
  }

  openEdit(item = undefined){
    const isAdd = _.isUndefined(item);
    const mdForm = this.modalService.open(PointEditComponent, { centered: true, size:'lg' });
    let msgOk:string = isAdd ? MessageStandard.add_ok: MessageStandard.upd_ok;

    // if (!isAdd){
    //   mdForm.componentInstance.setPoint(_.clone(item));
    // }
    // mdForm.result.then(x => this.majReussiCb(msgOk,isAdd,x), ()=>{/*rien à faire si l'utilisateur annule !*/});

    this.pointSrv.getOrInitPoint(item ? item.Id:undefined).subscribe(n=>{
      mdForm.componentInstance.setPoint(n);
      mdForm.result.then(x => this.majReussiCb(msgOk,isAdd,x), ()=>{/*rien à faire si l'utilisateur annule !*/});
    });
  }

  private majReussiCb(message:string, reload: boolean, item: PointDetail=undefined){
    if (!reload && !_.isUndefined(item))
    _.assign(this.currentPoint, _.pick(item, _.keys(this.currentPoint)))
    else if (reload){
      this.dataSource.loadPartialData();
    }
    this.msg.success(message);
  }
}
