import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from '../../../../services/message.service';
import { Categorie } from '../../../../models/categorie';
import { CategorieService } from '../categorie.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CategorieDataSource } from '../categorie.data-source';
import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { fromEvent} from 'rxjs/observable/fromEvent';
import { GlobalInfo } from '../../../../services/global-info.service';
import { CustomPaginatorComponent } from '../../../tools/custom-paginator/custom-paginator.component';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {
  columnsToDisplay = ['Id','Code', 'Libelle'];
  dataSource :CategorieDataSource;

  @ViewChild(CustomPaginatorComponent) paginator: CustomPaginatorComponent;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private msg: MessageService, private categorieSrv: CategorieService, private globals: GlobalInfo) { 
  }

  ngOnInit() {
    this.dataSource = new CategorieDataSource(this.categorieSrv,this.globals);
    this.dataSource.loadPartialData();
  }

  runFilter(value){
    this.paginator.initPagination();
    this.dataSource.filterValue = value;
    this.loadCategoriesPage();
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
    this.loadCategoriesPage();
  }

  loadCategoriesPage(){
    this.dataSource.loadPartialData();
  }
}

