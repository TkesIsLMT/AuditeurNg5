import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClientModule} from '@angular/common/http';
import { TranslateHttpLoader} from '@ngx-translate/http-loader'
import { WebpackTranslateLoader } from './utils/WebpackTranslateLoader';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';

import { AppMaterialModule } from './app-material.module';

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

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    NavigationComponent,
    MainSectionComponent,
    CategorieListComponent,
    PointListComponent,
    HomeComponent,
    NotFoundComponent,
    ReferentielTopTableComponent,CustomPaginatorComponent,
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
    AppMaterialModule
    ],
  providers: [GlobalInfo, MessageService, CategorieService, PointService],
  bootstrap: [AppComponent]
})
export class AppModule { }
