import { Component, OnInit, ViewChild, ElementRef, Input } from '@angular/core';
import { MatPaginator, MatSort } from "@angular/material";
import { fromEvent } from "rxjs/observable/fromEvent";
import { GlobalInfo } from '../../../services/global-info.service';
import { ReferentielTopTableComponent } from '../referentiel-top-table/referentiel-top-table.component';
import { SynthesePartialList } from '../../../shared/synthese/synthese-partial-list';
import { SynthesePaginatorDataSource } from '../synthese-paginator-data-source';

@Component({
  selector: 'app-custom-paginator',
  templateUrl: './custom-paginator.component.html',
  styleUrls: ['./custom-paginator.component.css']
})
export class CustomPaginatorComponent implements OnInit {
  @Input() dataSource: SynthesePaginatorDataSource;
  
  rowCount :number;
  manualPage :number;
  pageSizeOptionList: number[];

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private globals: GlobalInfo) { 
  }

  ngOnInit() {
    this.initPagination();
    this.dataSource.currentPageSize = this.globals.defaultPageSize;
    this.pageSizeOptionList = this.globals.defaultPageSizeList;
    this.dataSource.countData().subscribe(ttl=> this.setRowCount(ttl));
  }

  setRowCount(value){
    this.rowCount = value;
  }
  
  ngAfterViewInit() {
    this.paginator.page.subscribe(()=>this.loadPage());
  }

  checkManualPage(){
    if (this.manualPage<1)
      this.manualPage = 1;
    else if (this.manualPage > (this.rowCount / this.paginator.pageSize))
      this.manualPage = Math.ceil(this.rowCount / this.paginator.pageSize);
    this.paginator.pageIndex = this.manualPage - 1;
  }

  gotoPage(){
    this.checkManualPage();
    this.loadPage();
  }

  public initPagination() {
    this.manualPage = 1;
    this.paginator.pageIndex = 0;
    this.dataSource.currentPageNumber = 0;
  }

  loadPage(){
    this.dataSource.currentPageNumber = this.paginator.pageIndex;
    this.dataSource.currentPageSize = this.paginator.pageSize;
    this.dataSource.loadPartialData();
    this.manualPage = this.paginator.pageIndex + 1;
  }
}
