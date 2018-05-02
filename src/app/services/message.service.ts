import { Injectable } from '@angular/core';
import { ToastrService, IndividualConfig } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
@Injectable()
export class MessageService {
  defaultTitre :string;
  successOption: object; errorOption:object; warningOption :object; infoOption:object;

    constructor(private toastr: ToastrService, private translate :TranslateService) { 
      translate.get('app.titre').subscribe((o: string) => this.defaultTitre=o);
      
      this.successOption = {
        timeOut: 2000,
        positionClass:'toast-bottom-right'
      }

      this.infoOption = {
        timeOut: 10000,
        positionClass:'toast-bottom-right'
      }

      this.warningOption = {
        timeOut: 10000,
      }

      this.errorOption = {
        disableTimeOut: true,
        closeButton: true,
      }
      
    }
    

    success(msg :string, titre = this.defaultTitre){
      setTimeout(() => this.toastr.success(msg,titre,this.successOption));
    }

    error(msg :string, titre = this.defaultTitre){
      setTimeout(() => this.toastr.error(msg,titre, this.errorOption));
    }

    info(msg :string, titre = this.defaultTitre){
      setTimeout(() => this.toastr.info(msg,titre, this.infoOption));
    }

    warning(msg :string, titre = this.defaultTitre){
      setTimeout(() => this.toastr.warning(msg,titre, this.warningOption));
    }

}
