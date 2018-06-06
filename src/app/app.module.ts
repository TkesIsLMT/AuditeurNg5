import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { TranslateHttpLoader} from '@ngx-translate/http-loader'
import { WebpackTranslateLoader } from './utils/WebpackTranslateLoader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AngularMaterialModule } from './vendors/angular-material.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AngularSplitModule } from 'angular-split';

import { AppComponent } from './app.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { FooterComponent } from './components/layout/footer/footer.component';
import { NavigationComponent } from './components/layout/navigation/navigation.component';
import { MainSectionComponent } from './components/layout/main-section/main-section.component';
import { CategorieListComponent } from './components/business/categories/categorie-list/categorie-list.component';
import { PointListComponent } from './components/business/points/point-list/point-list.component';
import { AppRoutingModule } from './app-routing.module';
import { HomeComponent } from './components/business/home/home.component';
import { NotFoundComponent } from './components/layout/not-found/not-found.component';
import { MessageService } from './services/message.service';
import { CategorieService } from './components/business/categories/categorie.service';
import { FormsModule } from '@angular/forms';
import { PointService } from './components/business/points/point.service';
import { ReferentielTopTableComponent } from './components/tools/referentiel-top-table/referentiel-top-table.component';
import { CustomPaginatorComponent } from './components/tools/custom-paginator/custom-paginator.component';
import { GlobalInfo } from './services/global-info.service';
import { WinAuthInterceptor } from './services/http-interceptor';
import { CategorieEditComponent } from './components/business/categories/categorie-edit/categorie-edit.component';
import { ShowErrorsComponent } from './components/tools/show-errors/show-errors.component';
import { UniqueValidatorDirective } from './directives/unique-validator.directive';
import { UgoCheckComponent } from './components/tools/ugo-check/ugo-check.component';
import { UgoCheckTreeComponent } from './components/tools/ugo-check-tree/ugo-check-tree.component';
import { PointEditComponent } from './components/business/points/point-edit/point-edit.component';
import { CategorieTreeSelectComponent } from './components/business/categories/categorie-tree-select/categorie-tree-select.component';
import { EnumToKeysPipe } from './pipes/enum-to-keys.pipe';
import { UniteTravailTreeSelectComponent } from './components/business/unite-travail/unite-travail-tree-select/unite-travail-tree-select.component';
import { UniteTravailService } from './components/business/unite-travail/unite-travail.service';
import { PiTreeSelectComponent } from './components/business/pi/pi-tree-select/pi-tree-select.component';
import { PiService } from './components/business/pi/pi.service';
import { ModalToolButtonComponent } from './components/tools/modal-tool-button/modal-tool-button.component';
import { DeleteConfirmationDialogComponent } from './components/layout/dialogs/delete-confirmation-dialog.component';
import { DesactivateConfirmationDialogComponent } from './components/layout/dialogs/desactivate-confirmation-dialog.component';
import { LodashFilterPipe } from './pipes/lodash-filter.pipe';
import { ModeleListComponent } from './components/business/modeles/modele-list/modele-list.component';
import { ModeleService } from './components/business/modeles/modele.service';
import { ModeleEditComponent } from './components/business/modeles/modele-edit/modele-edit.component';
import { ElementBaseComponent } from './components/business/modeles/conception/element-base/element-base.component';
import { ElementMenuComponent } from './components/business/modeles/conception/element-menu/element-menu.component';
import { ElementAddComponent } from './components/business/modeles/conception/element-add/element-add.component';
import { ElementMenuItemComponent } from './components/business/modeles/conception/element-menu-item/element-menu-item.component';
import { ElementTableauComponent } from './components/business/modeles/conception/element-tableau/element-tableau.component';
import { ElementLigneComponent } from './components/business/modeles/conception/element-ligne/element-ligne.component';
import { ElementCelluleComponent } from './components/business/modeles/conception/element-cellule/element-cellule.component';
import { WindowService } from './services/window.service';
import { ElementTableauConfigComponent } from './components/business/modeles/conception/element-tableau-config/element-tableau-config.component';
import { ElementCelluleConfigComponent } from './components/business/modeles/conception/element-cellule-config/element-cellule-config.component';
import { ElementStandardActionComponent } from './components/business/modeles/conception/element-standard-action/element-standard-action.component';
import { ElementSousModeleComponent } from './components/business/modeles/conception/element-sous-modele/element-sous-modele.component';
import { ElementSousModeleConfigComponent } from './components/business/modeles/conception/element-sous-modele-config/element-sous-modele-config.component';
import { ExploiElementBaseComponent } from './components/business/modeles/exploitation/exploi-element-base/exploi-element-base.component';
import { ExploiMenuComponent } from './components/business/modeles/exploitation/exploi-menu/exploi-menu.component';
import { ExploiCelluleComponent } from './components/business/modeles/exploitation/exploi-cellule/exploi-cellule.component';
import { ExploiTableauComponent } from './components/business/modeles/exploitation/exploi-tableau/exploi-tableau.component';
import { StringAsArrayPipe } from './pipes/string-as-array.pipe';

@NgModule({
  declarations: [
    AppComponent, HeaderComponent, FooterComponent, NavigationComponent, MainSectionComponent,
    CategorieListComponent, CategorieEditComponent, 
    PointListComponent, PointEditComponent, 
    HomeComponent,
    NotFoundComponent,
    ReferentielTopTableComponent,CustomPaginatorComponent, ShowErrorsComponent, UniqueValidatorDirective, 
    DeleteConfirmationDialogComponent, DesactivateConfirmationDialogComponent, 
    UgoCheckComponent, UgoCheckTreeComponent, 
    CategorieTreeSelectComponent, UniteTravailTreeSelectComponent, PiTreeSelectComponent, 
    ModalToolButtonComponent, 
    EnumToKeysPipe, LodashFilterPipe, 
    ModeleListComponent, ModeleEditComponent, 
    ElementBaseComponent, ElementMenuComponent, ElementAddComponent, ElementMenuItemComponent, ElementTableauComponent, ElementLigneComponent, ElementCelluleComponent, ElementTableauConfigComponent, ElementCelluleConfigComponent, ElementStandardActionComponent, ElementSousModeleComponent, ElementSousModeleConfigComponent,
    ExploiElementBaseComponent, ExploiMenuComponent, ExploiCelluleComponent, ExploiTableauComponent, StringAsArrayPipe,
  ],
  entryComponents: [
    DeleteConfirmationDialogComponent,
    DesactivateConfirmationDialogComponent,
    CategorieEditComponent, PointEditComponent,
    ElementTableauConfigComponent,ElementCelluleConfigComponent,ElementSousModeleConfigComponent,
  ],
  imports: [
    BrowserModule, NgbModule.forRoot(),
    FormsModule,
    AppRoutingModule, HttpClientModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      maxOpened: 10,
      newestOnTop: true,
      preventDuplicates: false,
      closeButton: false,
      tapToDismiss: true,
      enableHtml: true,
    }), 
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useClass: WebpackTranslateLoader
      }
    }),
    AngularMaterialModule,
    FontAwesomeModule,
    AngularSplitModule,
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WinAuthInterceptor,
      multi: true
    },
    WindowService,
    GlobalInfo, MessageService,
    CategorieService, PointService, ModeleService, UniteTravailService, PiService],
  bootstrap: [AppComponent]
})
export class AppModule { }