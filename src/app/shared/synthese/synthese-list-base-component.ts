import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { fromEvent} from 'rxjs/observable/fromEvent';
import { GlobalInfo } from '../../services/global-info.service';
import { CustomPaginatorComponent } from '../../components/tools/custom-paginator/custom-paginator.component';
import { SynthesePaginatorDataSource } from '../../components/tools/synthese-paginator-data-source';

export abstract class SyntheseListBaseComponent {
  columnsToDisplay = ['Id','Code', 'Libelle'];
  abstract dataSource :SynthesePaginatorDataSource;

  @ViewChild(CustomPaginatorComponent) paginator: CustomPaginatorComponent;
  @ViewChild(MatSort) sort: MatSort;

  runFilter(value){
    this.paginator.initPagination();
    this.dataSource.filterValue = value;
    this.loadPage();
  }
  
  ngAfterViewInit() {
    this.sort.sortChange.subscribe(()=>this.runSort());
  }

  runSort(){
    let sortAsc = this.sort.direction!=='asc';
    let sortCol = this.sort.active;
    if (this.sort.direction==='')
      sortCol = '';
      
    this.paginator.initPagination();
    this.dataSource.sortDataColumn = sortCol;
    this.dataSource.sortDirection = sortAsc;
    this.loadPage();
  }

  loadPage(){
    this.dataSource.loadPartialData();
  }
}

