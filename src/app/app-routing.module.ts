import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CategorieListComponent } from './components/business/categories/categorie-list/categorie-list.component';
import { PointListComponent } from './components/business/points/point-list/point-list.component';
import { NotFoundComponent } from './components/layout/not-found/not-found.component';
import { HomeComponent } from './components/business/home/home.component';
import { ModeleListComponent } from './components/business/modeles/modele-list/modele-list.component';
import { ModeleEditComponent } from './components/business/modeles/modele-edit/modele-edit.component';

const routes: Routes = [
  { path: '', redirectTo:'home', pathMatch:'full' },
  { path: 'home', component: HomeComponent },
  { path: 'categories', component: CategorieListComponent },
  { path: 'points', component: PointListComponent },
  { path: 'modeles', component: ModeleListComponent },
  { path: 'modeles/:id', component: ModeleEditComponent },
  { path: '**', component: NotFoundComponent },
];

@NgModule({
  exports:[ RouterModule],
  imports:[ RouterModule.forRoot(routes)]
})
export class AppRoutingModule { }
