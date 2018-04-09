import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';

@Injectable()
export class MessageService {
  defaultTitre :string;
    constructor(private toastr: ToastrService, private translate :TranslateService) { 
      translate.get('app.titre').subscribe((o: string) => this.defaultTitre=o);
    }

    init(){

    }
  
    success(msg :string, titre = this.defaultTitre){
      setTimeout(() => this.toastr.success(msg,titre));
    }

    error(msg :string, titre = this.defaultTitre){
      setTimeout(() => this.toastr.error(msg,titre));
    }

    info(msg :string, titre = this.defaultTitre){
      setTimeout(() => this.toastr.info(msg,titre));
    }

    warning(msg :string, titre = this.defaultTitre){
      setTimeout(() => this.toastr.warning(msg,titre));
    }

}
