import { Component, OnInit } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import * as _ from 'underscore';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {

  constructor(private translate:TranslateService) { }

  trTitre :string;

  ngOnInit() {
    this.translate.get('app.titre').subscribe((res :string) => { 
      this.trTitre = res; });
  }


}
