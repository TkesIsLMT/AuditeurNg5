import { Directive, ElementRef, Input, HostListener, Renderer2, OnInit, OnDestroy } from '@angular/core';
import * as _ from 'lodash';
import { ElementService } from '../components/business/modeles/element.service';
import { ISubscription } from 'rxjs/Subscription';
import { ElementBase } from '../components/business/modeles/element-base';

@Directive({
  selector: '[appElementLocalisable]'
})
export class ElementLocalisableDirective implements OnInit,OnDestroy {
  @Input() appElementLocalisable:ElementBase;
  private cssClass = 'active-element'; //class css ajoutée à l'élément si on est hors borne
  private activeSub:ISubscription;
  
  constructor(private elRef:ElementRef,private renderer: Renderer2, private eleSrv: ElementService) { 
  }
  ngOnInit(): void {
    this.activeSub = this.eleSrv.activeElement$.subscribe(res=>{
      const active = this.appElementLocalisable.Id === res.Id;
      const action = active ? 'addClass':'removeClass';
      this.renderer[action](this.elRef.nativeElement, this.cssClass);
      //this.activeItem = _.find(this.appElementLocalisable.childs, ['Id',res.Id]) as ElementBase;
    });
  }
  ngOnDestroy(): void {
    this.activeSub.unsubscribe();
  }
}
