import { Component, OnInit } from '@angular/core';
import { CategorieDetail } from '../categorie-detail';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { CategorieService } from '../categorie.service';
import { Observable } from 'rxjs/Observable';
import { CheckFieldDTI } from '../../../../models/check-field-dti';
import * as _ from 'lodash';
import { UgoTreeNode } from '../../../tools/ugo-check-tree/ugo-tree-node';
import { map } from 'rxjs/operators';
import { DynamicButton } from '../../../../utils/dynamic-button';

@Component({
  selector: 'app-categorie-edit',
  templateUrl: './categorie-edit.component.html',
  styleUrls: ['./categorie-edit.component.css']
})
export class CategorieEditComponent implements OnInit {
  pending :boolean = false;
  addMode :boolean = true;
  titreKey:string = '';

  categoriesMere:UgoTreeNode[] = [];
  categorie: CategorieDetail;
  additionnalTools: DynamicButton[] = [{caption:"Désactiver",title:"Désactiver et conserver la catégorie sans la supprimer", faClass:"fas fa-ban", btnClass:"bg-gradient-warning"}];

  constructor(private modalActive: NgbActiveModal, private catSrv:CategorieService) { 
    this.setCategorie(new CategorieDetail());
  }

  ngOnInit() {
  }

  setCategorie(cat:CategorieDetail){
    this.categorie = cat;
    this.addMode = _.isUndefined(cat.Id);
    this.titreKey = `categorie.edit.titre-${this.addMode ? 'ajout':'modif'}`;
    this.loadMeres();
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

  searchNode(catId, source: UgoTreeNode[] = this.categoriesMere) {
      return UgoTreeNode.findTreeNodeByPredicate(source, (node) => node.id == catId);
  }

  beforeCheckAction(node:UgoTreeNode) {
      if (node.checked)
          return;
      UgoTreeNode.foreachTreeNodeAction(this.categoriesMere, (node) => node.checked = false);
  }

  afterCheckAction(node) {
      this.categorie.CategorieMereId = node.checked ? node.value.Id : null;
  }

  loadMeres() {
    this.catSrv.arbreCategorie.pipe(
      //on masque les éléments non affectables
      map(arbre => {
        const currentNode = this.searchNode(this.categorie.Id, arbre);
        if (currentNode)
          UgoTreeNode.foreachTreeNodeAction(currentNode, n=>n.visible =false);
        const parentNode = this.searchNode(this.categorie.CategorieMereId, arbre);
        if (parentNode){
          parentNode.checked = true;
          UgoTreeNode.foreachTreeNodeAction(parentNode.parent, n=>n.expanded = true, true);
        }
        return arbre;
      })
    ).subscribe(
      resp => this.categoriesMere = resp,
      error=> console.log(error)
    );
  }
}
