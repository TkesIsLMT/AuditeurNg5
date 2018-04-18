import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from '../../../../services/message.service';
import { PointControle } from '../../../../models/point-controle';
import { PointService } from '../point.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { PointsDataSource } from '../point-data-source';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { fromEvent} from 'rxjs/observable/fromEvent';
import { GlobalInfo } from '../../../../services/global-info.service';
import { CustomPaginatorComponent } from '../../../tools/custom-paginator/custom-paginator.component';

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.css']
})
export class PointListComponent implements OnInit {
  columnsToDisplay = ['Id','Code', 'Libelle'];
  dataSource :PointsDataSource;

  @ViewChild(CustomPaginatorComponent) paginator: CustomPaginatorComponent;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private msg: MessageService, private pointSrv: PointService, private globals: GlobalInfo) { 
  }

  ngOnInit() {
    this.dataSource = new PointsDataSource(this.pointSrv,this.globals);
    this.dataSource.loadPartialData();
  }

  runFilter(value){
    this.paginator.initPagination();
    this.dataSource.filterValue = value;
    this.loadPointsPage();
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
    this.loadPointsPage();
  }

  loadPointsPage(){
    this.dataSource.loadPartialData();
  }
}
