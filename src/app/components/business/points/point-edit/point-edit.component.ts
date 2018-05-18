import { Component, OnInit } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
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

@Component({
  selector: 'app-point-edit',
  templateUrl: './point-edit.component.html',
  styleUrls: ['./point-edit.component.css']
})
export class PointEditComponent implements OnInit {
  pending :boolean = false;
  addMode :boolean = true;
  titreKey:string = '';

  enumTypePoint = TypePoint;
  listUnite:string[];
  private point: PointDetail;
  private unites$: Observable<string[]>;
  private selectedCategorie: CategorieDetail;

  constructor(private modalActive: NgbActiveModal, private pointSrv:PointService, private catSrv:CategorieService) { 
    this.setPoint(new PointDetail());
    this.unites$ = pointSrv.uniteInCache.data;
  }

  ngOnInit() {
    this.unites$.subscribe(res=> this.listUnite = res);
  }

  setPoint(pt:PointDetail){
    this.point = pt;
    this.addMode = _.isUndefined(pt.Id);
    this.titreKey = `point.edit.titre-${this.addMode ? 'ajout':'modif'}`;
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
      ()=>this.modalActive.close(this.point)
    );
  }
}

