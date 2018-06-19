import { Directive, ElementRef, Input, HostListener, Renderer2 } from '@angular/core';
import * as _ from 'lodash';

@Directive({
  selector: 'input[appHorsBorne]'
})
export class HorsBorneDirective {
  @Input() appHorsBorne:string; //class css ajoutée à l'élément si on est hors borne
  
  constructor(private elRef:ElementRef,private renderer: Renderer2) { 
  }

  @HostListener('change')
  onChange(){
    this.verify();
  } 
  @HostListener('keyup') 
  onKeyup(){
    this.verify();
  }

  private verify(){
    const test = this.estHorsBorne();
    const action = test ? 'addClass':'removeClass';
    const tabs = this.appHorsBorne.split(" ");
    _.each(tabs, o=> this.renderer[action](this.elRef.nativeElement, o));
  }

  private estHorsBorne():boolean{
    let valeur = parseInt(this.elRef.nativeElement.value);
    if (_.isNaN(valeur)) return true;
    
    let min = parseInt(this.elRef.nativeElement.min);
    let max = parseInt(this.elRef.nativeElement.max);
  
    if (_.isNaN(min) && _.isNaN(max)) return false;
    if (min === max) return false;
    return (valeur < min || valeur > max);
  }
}
