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
import { ElementBaseComponent } from './components/business/modeles/elements/element-base/element-base.component';
import { ElementMenuComponent } from './components/business/modeles/elements/element-menu/element-menu.component';
import { ElementAddComponent } from './components/business/modeles/elements/element-add/element-add.component';
import { ElementMenuItemComponent } from './components/business/modeles/elements/element-menu-item/element-menu-item.component';

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
    EnumToKeysPipe, LodashFilterPipe, ModeleListComponent, ModeleEditComponent, ElementBaseComponent, ElementMenuComponent, ElementAddComponent, ElementMenuItemComponent,
  ],
  entryComponents: [
    DeleteConfirmationDialogComponent,
    DesactivateConfirmationDialogComponent,
    CategorieEditComponent, PointEditComponent,
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
    ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: WinAuthInterceptor,
      multi: true
    },
    GlobalInfo, MessageService,
    CategorieService, PointService, ModeleService, UniteTravailService, PiService],
  bootstrap: [AppComponent]
})
export class AppModule { }