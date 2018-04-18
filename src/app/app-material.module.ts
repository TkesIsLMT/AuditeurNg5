import {NgModule} from '@angular/core';
import { MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
  MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
  MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
  MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule,
  MatTabsModule, MatToolbarModule, MatTooltipModule } from '@angular/material';
import {MatPaginatorIntl} from '@angular/material';

class MatPaginatorIntlFr extends MatPaginatorIntl{
  itemsPerPageLabel = 'Lignes par page';
  firstPageLabel:'Première';
  nextPageLabel='Suivante';
  previousPageLabel='Précédente';
  lastPageLabel:'Dernière';
  getRangeLabel = (page: number, pageSize: number, length: number) => {
    if (length == 0 || pageSize == 0) {
      return `0 sur ${length}`; 
    }
    length = Math.max(length, 0); 
    const startIndex = page * pageSize; 
    const endIndex = startIndex < length ? 
    Math.min(startIndex + pageSize, length) : startIndex + pageSize; 
    return `${startIndex + 1} - ${endIndex} sur ${length}`; 
  }
}

@NgModule({
  exports: [MatAutocompleteModule, MatButtonModule, MatButtonToggleModule, MatCardModule, MatCheckboxModule, MatChipsModule, MatDatepickerModule,
    MatDialogModule, MatDividerModule, MatExpansionModule, MatGridListModule, MatIconModule, MatInputModule, MatListModule, MatMenuModule,
    MatNativeDateModule, MatPaginatorModule, MatProgressBarModule, MatProgressSpinnerModule, MatRadioModule, MatRippleModule, MatSelectModule,
    MatSidenavModule, MatSliderModule, MatSlideToggleModule, MatSnackBarModule, MatSortModule, MatStepperModule, MatTableModule,
    MatTabsModule, MatToolbarModule, MatTooltipModule ],
  providers:[{provide: MatPaginatorIntl, useClass: MatPaginatorIntlFr}]
})
export class AppMaterialModule { }

