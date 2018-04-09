import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable()
export class CategorieService {

  constructor(private http: HttpClient, ) { }

}
