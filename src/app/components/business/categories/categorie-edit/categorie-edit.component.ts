import { Component, OnInit } from '@angular/core';
import { CategorieDetail } from '../categorie-detail';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieService } from '../categorie.service';
import { Observable } from 'rxjs/Observable';
import { CheckFieldDTI } from '../../../../models/check-field-dti';
import * as _ from 'lodash';

@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrls: ['./categorie-edit.component.css']
})
export class CategorieEditComponent implements OnInit {
  pending :boolean = false;
  addMode :boolean = true;
  titreKey:string = '';

  constructor(private modalActive: NgbActiveModal, private catSrv:CategorieService) { 
    this.setCategorie(new CategorieDetail());
  }

  ngOnInit() {
  }

  categorie: CategorieDetail;
  setCategorie(cat:CategorieDetail){
    this.categorie = cat;
    this.addMode = _.isUndefined(cat.Id);
    this.titreKey = `categorie.edit.titre-${this.addMode ? 'ajout':'modif'}`;
  }

  isCodeUniqueFn(value: any){
    let p : CheckFieldDTI = {
      ExcludeId:this.categorie.Id,
      Field:'categorie.code',
      Value:value
    };
    return this.catSrv.isCodeUnique(p);
  }
  isCodeUnique = this.isCodeUniqueFn.bind(this);

  onCancel(reason:string = ''){
    this.modalActive.dismiss(reason);
  }

  onSubmit(myForm){
    console.log(myForm);
    this.pending = true;
    this.catSrv.saveCategorie(this.categorie).subscribe(
      ()=>this.modalActive.close(this.categorie)
    );
  }
}
