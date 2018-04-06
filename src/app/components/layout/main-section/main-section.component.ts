import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-section',
  templateUrl: './main-section.component.html',
  styleUrls: ['./main-section.component.css']
})
export class MainSectionComponent implements OnInit {

  constructor() { }

  compteur: string[] = [
    'Peggy','Laurent','Alizé','Alice','Arthur','Lexy',
    'Peggy','Laurent','Alizé','Alice','Arthur','Lexy',
    'Peggy','Laurent','Alizé','Alice','Arthur','Lexy',
    'Peggy','Laurent','Alizé','Alice','Arthur','Lexy',
    'Peggy','Laurent','Alizé','Alice','Arthur','Lexy',
    'Peggy','Laurent','Alizé','Alice','Arthur','Lexy',
    'Peggy','Laurent','Alizé','Alice','Arthur','Lexy999']
  ngOnInit() {
  }

}
