import { Observable } from "rxjs/Observable";
import { ReferentielPartialLoadingList } from "./referentiel-partial-loading-list";

export abstract class ReferentielBaseService {
    abstract findData(filter:string, sortCol:string, sortAsc:boolean, pageNumber:number, pageSize:number):Observable<ReferentielPartialLoadingList>;
} 