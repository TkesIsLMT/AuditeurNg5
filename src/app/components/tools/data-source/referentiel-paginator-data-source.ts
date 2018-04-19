import { PaginatorDataSource } from "./paginator-data-source";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { CollectionViewer } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";
import { ReferentielData } from "../referentiel-utils/referentiel-data";
import { ReferentielBaseService } from "../referentiel-utils/referentiel-base-service";
import { GlobalInfo } from "../../../services/global-info.service";
import { ReferentielPartialLoadingList } from "../referentiel-utils/referentiel-partial-loading-list";

export abstract class ReferentielPaginatorDataSource extends PaginatorDataSource<ReferentielData> {
    filterValue: string;
    sortDataColumn: string;
    sortDirection: boolean;
    currentPageNumber: number;
    currentPageSize: number;
    private pointsSubject = new BehaviorSubject<ReferentielData[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public loading$ = this.loadingSubject.asObservable();

    abstract dataService:ReferentielBaseService;

    constructor(private globals: GlobalInfo) {
        super();
        this.sortDataColumn = "Id";
        this.sortDirection = true;
        this.currentPageSize = this.globals.defaultPageSize;
    }

    connect(collectionViewer: CollectionViewer): Observable<ReferentielData[]> {
        return this.pointsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.pointsSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    countData():Observable<number>{
        return this.countSubject.asObservable();
    }
    connectCount():Observable<number>{
        return this.countSubject.asObservable();
    }

    loadPartialData() {
        this.loadingSubject.next(true);
        this.load(this.filterValue,this.sortDataColumn,this.sortDirection, this.currentPageNumber,this.currentPageSize);
    }

    load(filter:string, sortColumn:string, sortDirection:boolean, pageIndex:number, pageSize:number){
        //appel du dataService qui est abstract et donc fait le lien avec les bonnes données
        this.dataService.findData(filter, sortColumn, sortDirection,
            pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() =>  this.loadingSubject.next(false))
        ).subscribe((pts: ReferentielPartialLoadingList) => {
            this.pointsSubject.next(pts.PageData);
            this.countSubject.next(pts.CountAll);
        } );
    }
}