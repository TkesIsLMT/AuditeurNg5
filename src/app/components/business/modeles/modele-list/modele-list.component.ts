import { Component, OnInit } from "@angular/core";
import { MessageService } from "../../../../services/message.service";
import { GlobalInfo } from "../../../../services/global-info.service";
import { ReferentielListBaseComponent } from "../../../tools/referentiel-utils/referentiel-list-base-component";
import { NgbModal } from "@ng-bootstrap/ng-bootstrap";
import { TranslateService } from "@ngx-translate/core";
import { DynamicButton } from "../../../../utils/dynamic-button";
import { MessageStandard } from "../../../../enums/message-standard.enum";
import * as _ from 'lodash';
import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { DeleteConfirmationDialogComponent } from "../../../layout/dialogs/delete-confirmation-dialog.component";
import { ModeleDataSource } from "../modele-data-source";
import { ModeleDetail } from "../modele-detail";
import { ModeleService } from "../modele.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-modele-list',
  templateUrl: './modele-list.component.html',
  styleUrls: ['./modele-list.component.css',
  '../../../tools/referentiel-utils/referentiel-style.css']
})
export class ModeleListComponent extends ReferentielListBaseComponent implements OnInit  {
  dataSource :ModeleDataSource;
  currentModele: ModeleDetail = new ModeleDetail();
  addBtn: DynamicButton;
  columnsToDisplay = ['Id', 'Code', 'Libelle','Unite', 'Active', 'Actions'];

  private getModele$: Observable<ModeleDetail>;

  constructor(private router: Router,
      private msg: MessageService, private modeleSrv: ModeleService, private globals: GlobalInfo,
      private modalService: NgbModal, private translate: TranslateService) { 
    super();
    this.addBtn = {key:'add', caption: '...', faClass: 'fas fa-plus', btnClass: 'btn btn-sm btn-primary', visible: true };
    this.translate.get('modele.liste.ajouter').subscribe(res=>this.addBtn.caption=res);
  }

  onRowClick(item){
    this.currentModele = item;
  }
  ngOnInit() {
    this.dataSource = new ModeleDataSource(this.modeleSrv,this.globals);
    this.loadPage();
  }

  askDelete(item){
    const confirm = this.modalService.open(DeleteConfirmationDialogComponent);
    confirm.result.then(x=> this.delete(item),()=>{/*rien à faire si l'utilisateur annule la suppression !*/});
  }

  private delete(item){
    // this.modeleSrv.deleteModele(item.Id).subscribe(
    //   ()=>this.majReussiCb(MessageStandard.del_ok,true),
    //   ()=>this.msg.error(MessageStandard.del_nok));
  }

  openEdit(item:ModeleDetail = undefined){
    this.router.navigate(['modeles', item.Id]);
    
    // const isAdd = _.isUndefined(item);
    // const mdForm = this.modalService.open(ModeleEditComponent, { centered: true, size:'lg' });
    // let msgOk:string = isAdd ? MessageStandard.add_ok: MessageStandard.upd_ok;

    // this.modeleSrv.getOrInitModele(item ? item.Id:undefined).subscribe(n=>{
    //   mdForm.componentInstance.setModele(n);
    //   mdForm.result.then(x => this.majReussiCb(msgOk,isAdd,x), ()=>{/*rien à faire si l'utilisateur annule !*/});
    // });
  }

  // private majReussiCb(message:string, reload: boolean, item: ModeleDetail=undefined){
  //   if (!reload && !_.isUndefined(item))
  //     _.assign(this.currentModele, _.pick(item, _.keys(this.currentModele)))
  //   else if (reload){
  //     this.dataSource.loadPartialData();
  //   }
  //   this.msg.success(message);
  // }
}
