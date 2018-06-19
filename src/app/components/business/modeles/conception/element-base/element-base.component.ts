import { Component, Input, OnInit, OnDestroy, Renderer2, ElementRef } from '@angular/core';
import { TypeElement } from '../../../../../enums/type-element.enum';
import * as _ from 'lodash';
import { ModeleDetail } from '../../modele-detail';
import { PointDetail } from '../../../points/point-detail';
import { ElementBase } from '../../element-base';
import { ElementService } from '../../element.service';
import { ISubscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-element-base',
  templateUrl: './element-base.component.html',
  styleUrls: ['./element-base.component.css']
})
export class ElementBaseComponent implements OnInit, OnDestroy{
  @Input() element:ElementBase;
  @Input() modele:ModeleDetail;

  private activeSub:ISubscription;
  private isExpanded:boolean = true;
  
  constructor(private elRef:ElementRef, private eleSrv:ElementService, private renderer:Renderer2) { 

  }

  ngOnInit(): void {
    this.activeSub = this.eleSrv.activeElement$.subscribe(res=>{
      const active = this.element.Id === res.Id;
      const action = active ? 'addClass':'removeClass';
      this.renderer[action](this.elRef.nativeElement,'active-element');
    });
  }
  ngOnDestroy(): void {
    this.activeSub.unsubscribe();
  }

  onClick(event){
    event.stopPropagation();
    this.eleSrv.activateElement(this.element);
  }
  
  titreElement(){
    let str = '';
    if (this.element){
      if (this.element.Libelle) {
        str += this.element.Libelle;
      } else {
        str += TypeElement[this.element.TypeElement];
      } 
      if (this.element.childs) {
        str += ` (${this.element.childs.length} sous-élément/s)`;
      }
    }
    return str;
  }

}
