import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from '../../../../services/message.service';
import { PointControle } from '../../../../models/point-controle';
import { PointService } from '../point.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { PointsDataSource } from '../point-data-source';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { fromEvent} from 'rxjs/observable/fromEvent';

@Component({
  selector: 'app-point-list',
  templateUrl: './point-list.component.html',
  styleUrls: ['./point-list.component.css']
})
export class PointListComponent implements OnInit {
  columnsToDisplay = ['Id','Code', 'Libelle'];
  dataSource :PointsDataSource;
  nbPoints :number;
  
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  @ViewChild('input') input: ElementRef;

  constructor(private msg: MessageService, private pointSrv: PointService) { 
  }

  ngOnInit() {
    //this.msg.info("ngOnInit()");

    this.dataSource = new PointsDataSource(this.pointSrv);
    this.dataSource.loadPoints();
    this.dataSource.connectCount().subscribe(ttl=>this.nbPoints = ttl);
  }

  
  ngAfterViewInit() {

    console.log(this.input);
    // server-side search
    fromEvent(this.input.nativeElement,'keyup')
    .pipe(
        debounceTime(150),
        distinctUntilChanged(),
        tap(() => {
            this.paginator.pageIndex = 0;
            this.loadPointsPage();
        })
    ).subscribe();

    this.paginator.page.pipe(tap(()=>this.loadPointsPage())).subscribe();
    
    this.sort.sortChange.subscribe(()=>this.paginator.pageIndex= 0);
    merge(this.sort.sortChange, this.paginator.page).pipe(
      tap(()=>this.loadPointsPage())
    ).subscribe();
  }

  loadPointsPage( ){
    console.log (this.sort);
    let sortAsc = this.sort.direction!=='asc';
    let sortCol = this.sort.active;
    if (this.sort.direction==='')
      sortCol = '';
    this.dataSource.loadPoints(this.input.nativeElement.value, sortCol, sortAsc ,this.paginator.pageIndex, this.paginator.pageSize);
  }
}
