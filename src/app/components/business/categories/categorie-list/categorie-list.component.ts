import { Component, OnInit, ViewChild } from '@angular/core';
import { MessageService } from '../../../../services/message.service';
import { Categorie } from '../../../../models/categorie';
import { CategorieService } from '../categorie.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {
  categories: Categorie[];
  columnsToDisplay = ['Id','Code', 'Libelle'];
  dataSource = new MatTableDataSource<Categorie>(this.categories);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private msg: MessageService, private categorieSrv: CategorieService) { 
  }

  ngOnInit() {
    //this.msg.info("ngOnInit()");
    this.categorieSrv.getCategories().subscribe(resp => {
      this.categories = resp;
      this.dataSource.data = this.categories;
    });
    
  }

  applyFilter(filterValue: string) {
    console.log('receive event with ' + filterValue);
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }
  
  /**
   * Set the paginator after the view init since this component will
   * be able to query its view for the initialized paginator.
   */
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }


}
