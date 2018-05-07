import { Component, OnInit, Output, Input, ViewChild, ElementRef, EventEmitter } from '@angular/core';
import { fromEvent } from 'rxjs/observable/fromEvent';
import { debounceTime, distinctUntilChanged, tap } from 'rxjs/operators';
import { DynamicButton } from '../../../utils/dynamic-button';

@Component({
  selector: 'app-referentiel-top-table',
  templateUrl: './referentiel-top-table.component.html',
  styleUrls: ['./referentiel-top-table.component.css']
})
export class ReferentielTopTableComponent implements OnInit {

  @Input('loading') showLoading :boolean = false;
  @Input() addBtn:DynamicButton;
  @Output() filterValueChange = new EventEmitter<string>();
  @Output() toolClick = new EventEmitter<string>();
  @ViewChild('filterInput') filterInput: ElementRef;
  
  showSearchInput :boolean = false;
  lastFilter:string='';
  constructor() {
    this.addBtn = { caption: 'Ajouter', faClass: 'fas fa-plus', btnClass: 'btn btn-primary', visible: false };
   }

  ngOnInit() {
    
  }

  ngAfterViewInit() {
    fromEvent(this.filterInput.nativeElement,'input') 
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            if (this.lastFilter !== this.filterInput.nativeElement.value) {
              this.lastFilter = this.filterInput.nativeElement.value;
              this.filterValueChange.emit(this.lastFilter);
            }
        })
    ).subscribe();
  }

  toggleSearch(){
    this.showSearchInput=!this.showSearchInput;
  }

  emit(key:string){
    this.toolClick.emit(key);
  }
}
