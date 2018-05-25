import { Component, OnInit } from '@angular/core';
import { NgbActiveModal, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { CheckFieldDTI } from '../../../../models/check-field-dti';
import * as _ from 'lodash';
import { UgoTreeNode } from '../../../tools/ugo-check-tree/ugo-tree-node';
import { map, tap } from 'rxjs/operators';
import { PointDetail } from '../point-detail';
import { PointService } from '../point.service';
import { CategorieService } from '../../categories/categorie.service';
import { CategorieDetail } from '../../categories/categorie-detail';
import { CategorieEditComponent } from '../../categories/categorie-edit/categorie-edit.component';
import { TypePoint } from '../../../../enums/type-point.enum';
import { MessageService } from '../../../../services/message.service';
import { DynamicButton } from '../../../../utils/dynamic-button';
import { MessageStandard } from '../../../../enums/message-standard.enum';
import { DesactivateConfirmationDialogComponent } from '../../../layout/dialogs/desactivate-confirmation-dialog.component';
import { Subject } from 'rxjs/Subject';

@Component({
  selector: 'app-point-edit',
  templateUrl: './point-edit.component.html',
  styleUrls: ['./point-edit.component.css']
})
export class PointEditComponent implements OnInit {
  point: PointDetail = new PointDetail();
  pending :boolean = false;
  addMode :boolean = true;
  titreKey:string = 'point.edit.titre.ajout';

  enumTypePoint = TypePoint;
  listUnite:string[];
  additionnalTools: DynamicButton[] = [];

  private unites$: Observable<string[]>;
  private selectedCategorie: CategorieDetail;

  constructor(private modalActive: NgbActiveModal, private modalSrv:NgbModal, private msg:MessageService, 
      private pointSrv:PointService, private catSrv:CategorieService) { 
    this.setPoint(new PointDetail());
    this.unites$ = pointSrv.uniteInCache.data;
  }

  ngOnInit() {
    this.unites$.subscribe(res=> this.listUnite = res);
  }

  private manageActivatation(state:boolean){
    this.pointSrv.changePointState(this.point,state).subscribe(
      ()=> {
        this.point.IsEnable = state;
        this.modalActive.close(this.point);
      },
      ()=>this.msg.error(MessageStandard.upd_nok));
  }

  onAdditionnalToolsClick(button:DynamicButton){
    switch (button.key) {
      case 'active':
        this.manageActivatation(true);
        break;
      case 'desactive':
        this.modalSrv.open(DesactivateConfirmationDialogComponent)
          .result.then(x=> this.manageActivatation(false),()=>{/*rien à faire si l'utilisateur annule la suppression !*/});
        break;
      default:
        console.log('clé de bouton inconnue');
        break;
    }
  }

  setPoint(pt:PointDetail){
    this.point = pt;
    this.addMode = _.isUndefined(pt.Id);
    this.titreKey = `point.edit.titre-${this.addMode ? 'ajout':'modif'}`;
    this.additionnalTools= [
      {key:"active",caption:"Activer",title:"Ré-activer le point de contrôle", faClass:"fas fa-play", visible: !this.point.IsEnable},
      {key:"desactive",caption:"Désactiver",title:"Désactiver et conserver le point de contrôle", faClass:"fas fa-pause", visible: this.point.IsEnable}];
  }

  isCodeUniqueFn(value: any){
    let p : CheckFieldDTI = {
      ExcludeId:this.point.Id,
      Field:'point.code',
      Value:value
    };
    return this.pointSrv.isCodeUnique(p);
  }
  isCodeUnique = this.isCodeUniqueFn.bind(this);

  notTypePoint(){
    return _.isNil(this.point.TypePoint);
  }

  onCancel(reason:string = ''){
    this.modalActive.dismiss(reason);
  }

  onSubmit(myForm){
    console.log(myForm);
    this.pending = true;

    this.point.CategorieId = this.point.Categorie.Id;
    this.pointSrv.savePoint(this.point).subscribe(
      ()=>this.modalActive.close(this.point),
      (err) => this.msg.error(err)
    );
  }
}

