import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../../environments/environment';
import { Observable } from 'rxjs/Observable';

import { Categorie } from '../../../models/categorie';

const httpOptions = {
  headers: new HttpHeaders({
      'Content-Type':  'application/json'
      }),
  //withCredentials: true,
};

@Injectable()
export class CategorieService {

  private baseUrl = 'categorie';

  constructor(private http: HttpClient) { 
    this.baseUrl = environment.apiurl + this.baseUrl;
  }

  getCategories(): Observable<Categorie[]>{
    return this.http.get<Categorie[]>(this.baseUrl, httpOptions);
  }
}
