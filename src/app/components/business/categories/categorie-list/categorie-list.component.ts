import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { MessageService } from '../../../../services/message.service';
import { CategorieService } from '../categorie.service';
import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
import { CategorieDataSource } from '../categorie.data-source';
import { tap, debounceTime, distinctUntilChanged, catchError } from 'rxjs/operators';
import { merge } from 'rxjs/observable/merge';
import { fromEvent} from 'rxjs/observable/fromEvent';
import { GlobalInfo } from '../../../../services/global-info.service';
import { CustomPaginatorComponent } from '../../../tools/custom-paginator/custom-paginator.component';
import { ReferentielListBaseComponent } from '../../../tools/referentiel-utils/referentiel-list-base-component';
import { CategorieDetail } from '../categorie-detail';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import * as _ from 'lodash';
import { MessageStandard } from '../../../../enums/message-standard.enum';
import { CategorieEditComponent } from '../categorie-edit/categorie-edit.component';
import { DeleteConfirmationDialogComponent } from '../../../layout/delete-confirmation-dialog/delete-confirmation-dialog.component';
import { of } from 'rxjs/observable/of';
import { DynamicButton } from '../../../../utils/dynamic-button';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css',
    '../../../tools/referentiel-utils/referentiel-style.css']
})
export class CategorieListComponent extends ReferentielListBaseComponent implements OnInit  {
  dataSource :CategorieDataSource;
  currentCategorie: CategorieDetail = new CategorieDetail();
  addBtn: DynamicButton;

  constructor(private msg: MessageService, private categorieSrv: CategorieService, private globals: GlobalInfo,
      private modalService: NgbModal, private translate: TranslateService) { 
    super();
    this.addBtn = { caption: '...', faClass: 'fas fa-plus', btnClass: 'btn btn-sm btn-primary', visible: true };
    this.translate.get('categorie.liste.ajouter').subscribe(res=>this.addBtn.caption=res);
    // this.columnsToDisplay.push('Actions');
  }

  onRowClick(item){
    this.currentCategorie = item;
  }
  ngOnInit() {
    this.dataSource = new CategorieDataSource(this.categorieSrv,this.globals);
    this.loadPage();
  }

  askDelete(item){
    const confirm = this.modalService.open(DeleteConfirmationDialogComponent);
    confirm.result.then(x=> this.delete(item),()=>{/*rien à faire si l'utilisateur annule la suppression !*/});
  }

  private delete(item){
    this.categorieSrv.deleteCategorie(item.Id).subscribe(
      ()=>this.majReussiCb(MessageStandard.del_ok,true),
      ()=>this.msg.error(MessageStandard.del_nok));
  }

  openEdit(item = undefined){
    const isAdd = _.isUndefined(item);
    const mdForm = this.modalService.open(CategorieEditComponent, { centered: true });
    let msgOk:string = isAdd ? MessageStandard.add_ok: MessageStandard.upd_ok;

    if (!isAdd){
      mdForm.componentInstance.setCategorie(_.clone(item));
    }
    mdForm.result.then(x => this.majReussiCb(msgOk,isAdd,x), ()=>{/*rien à faire si l'utilisateur annule !*/});
  }

  private majReussiCb(message:string, reload: boolean, item: CategorieDetail=undefined){
    if (!reload && !_.isUndefined(item))
    _.assign(this.currentCategorie, _.pick(item, _.keys(this.currentCategorie)))
    else if (reload){
      this.dataSource.loadPartialData();
    }
    this.msg.success(message);
  }
}


















// import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
// import { MessageService } from '../../../../services/message.service';
// import { Categorie } from '../../../../models/categorie';
// import { CategorieService } from '../categorie.service';
// import { MatPaginator, MatTableDataSource, MatSort } from '@angular/material';
// import { CategorieDataSource } from '../categorie.data-source';
// import { tap, debounceTime, distinctUntilChanged } from 'rxjs/operators';
// import { merge } from 'rxjs/observable/merge';
// import { fromEvent} from 'rxjs/observable/fromEvent';
// import { GlobalInfo } from '../../../../services/global-info.service';
// import { CustomPaginatorComponent } from '../../../tools/custom-paginator/custom-paginator.component';

// @Component({
//   selector: 'app-categorie-list',
//   templateUrl: './categorie-list.component.html',
//   styleUrls: ['./categorie-list.component.css',
//     '../../../../shared/synthese/synthese.css']
// })
// export class CategorieListComponent implements OnInit {
//   columnsToDisplay = ['Id','Code', 'Libelle'];
//   dataSource :CategorieDataSource;

//   @ViewChild(CustomPaginatorComponent) paginator: CustomPaginatorComponent;
//   @ViewChild(MatSort) sort: MatSort;

//   constructor(private msg: MessageService, private categorieSrv: CategorieService, private globals: GlobalInfo) { 
//   }

//   ngOnInit() {
//     this.dataSource = new CategorieDataSource(this.categorieSrv,this.globals);
//     this.dataSource.loadPartialData();
//   }

//   runFilter(value){
//     this.paginator.initPagination();
//     this.dataSource.filterValue = value;
//     this.loadCategoriesPage();
//   }
  
//   ngAfterViewInit() {
//     this.sort.sortChange.subscribe(()=>this.runSort());
//   }

//   runSort(){
//     let sortAsc = this.sort.direction!=='asc';
//     let sortCol = this.sort.active;
//     if (this.sort.direction==='')
//       sortCol = '';
      
//     this.paginator.initPagination();
//     this.dataSource.sortDataColumn = sortCol;
//     this.dataSource.sortDirection = sortAsc;
//     this.loadCategoriesPage();
//   }

//   loadCategoriesPage(){
//     this.dataSource.loadPartialData();
//   }
// }

