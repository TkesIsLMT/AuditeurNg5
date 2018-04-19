import { Observable } from "rxjs/Observable";
import { SynthesePartialList } from "./synthese-partial-list";

export abstract class SyntheseService {
    abstract findData(filter:string, sortCol:string, sortAsc:boolean, pageNumber:number, pageSize:number):Observable<SynthesePartialList>;
} 