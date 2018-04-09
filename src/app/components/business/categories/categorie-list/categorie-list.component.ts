import { Component, OnInit } from '@angular/core';
import { MessageService } from '../../../../services/message.service';

@Component({
  selector: 'app-categorie-list',
  templateUrl: './categorie-list.component.html',
  styleUrls: ['./categorie-list.component.css']
})
export class CategorieListComponent implements OnInit {

  constructor(private msg: MessageService) { }

  ngOnInit() {
    this.showSuccess('ngOnInit running...');
  }

  showSuccess(msg:string){
    this.msg.success(msg, "success toast'rrrr !!!");
    this.msg.error(msg, "error toast'rrrr !!!");
    this.msg.info(msg, "info toast'rrrr !!!");
    this.msg.warning(msg, "warning toast'rrrr !!!");
  }

}
