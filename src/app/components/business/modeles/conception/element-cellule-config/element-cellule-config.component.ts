import { Component, OnInit } from '@angular/core';
import { ElementBase } from '../../element-base';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { TypeElement } from '../../../../../enums/type-element.enum';
import { NgForm } from '@angular/forms';
import { PointDetail } from '../../../points/point-detail';
import { Observable } from 'rxjs/Observable';
import * as _ from 'lodash';
import { ElementService } from '../../element.service';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-element-cellule-config',
  templateUrl: './element-cellule-config.component.html',
  styleUrls: ['./element-cellule-config.component.css'],
})
export class ElementCelluleConfigComponent implements OnInit {
  element:ElementBase;
  selectedPointControle:PointDetail;
  points$:Observable<PointDetail[]>;
  private eleSrv:ElementService;

  constructor(private modalActive: NgbActiveModal) { 
    this.setElement(new ElementBase(TypeElement.Cellule)); 
    this.points$ = new Observable<PointDetail[]>();
  }

  setContext(ctx:{ele:ElementBase,srv:ElementService}){
    this.setElement(ctx.ele);
    this.setElementService(ctx.srv);
  }

  private setElementService(srv:ElementService): void {
    this.eleSrv = srv;
    this.points$ = this.eleSrv.pointsDisponible.data.pipe(tap(o=>this.selectedPointControle = _.find(o,['Id',this.element.PointControleId])));
  }

  ngOnInit() {
  }

  changePoint(){
    if (this.selectedPointControle){
      this.element.EstObligatoire = this.selectedPointControle.EstObligatoire;
      this.element.EstCommentable = this.selectedPointControle.EstCommentable;
      this.element.EstLiableATL = this.selectedPointControle.EstLiableATL;
    }
  }

  comparePoint(a:PointDetail,b:PointDetail){
    return a === b || (a && b && a.Id===b.Id);
  }

  notPoint(){
    return _.isUndefined(this.selectedPointControle);
  }

  private setElement(ele:ElementBase): void {
    this.element = ele;
  }
  
  showLibelle():boolean{
    return _.isUndefined(this.element.parent) || (this.element.parent as ElementBase).TypeElement !== TypeElement.Ligne;
  }


  submit(form:NgForm){
    if (form.invalid)
      return;
//mapper data
    this.element.PointControle = this.selectedPointControle;
    this.element.PointControleId = this.selectedPointControle.Id;
    this.modalActive.close(this.element);
  }
  cancel(key:string){
    this.modalActive.dismiss(key);
  }

}
