import { Observable } from "rxjs/Observable";
import { ReferentielPartialLoadingList } from "./referentiel-partial-loading-list";
import { ServiceBase } from "../../../services/service-base";
import { MessageService } from "../../../services/message.service";

export abstract class ReferentielBaseService extends ServiceBase {
    constructor(msg:MessageService) {
        super(msg);
    }
    abstract findData(filter:string, sortCol:string, sortAsc:boolean, pageNumber:number, pageSize:number):Observable<ReferentielPartialLoadingList>;
} 