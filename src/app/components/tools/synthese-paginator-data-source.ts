import { PaginatorDataSource } from "./paginator-data-source";
import { GlobalInfo } from "./../../services/global-info.service";
import { Synthese } from "./../../shared/synthese/synthese";
import { SynthesePartialList } from "./../../shared/synthese/synthese-partial-list";
import { BehaviorSubject } from "rxjs/BehaviorSubject";
import { CollectionViewer } from "@angular/cdk/collections";
import { Observable } from "rxjs/Observable";
import { SyntheseService } from "../../shared/synthese/synthese-service";
import { catchError, finalize } from "rxjs/operators";
import { of } from "rxjs/observable/of";

export abstract class SynthesePaginatorDataSource extends PaginatorDataSource<Synthese> {
    filterValue: string;
    sortDataColumn: string;
    sortDirection: boolean;
    currentPageNumber: number;
    currentPageSize: number;
    private pointsSubject = new BehaviorSubject<Synthese[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    public loading$ = this.loadingSubject.asObservable();

    abstract dataService:SyntheseService;

    constructor(private globals: GlobalInfo) {
        super();
        this.sortDataColumn = "Id";
        this.sortDirection = true;
        this.currentPageSize = this.globals.defaultPageSize;
    }

    connect(collectionViewer: CollectionViewer): Observable<Synthese[]> {
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
        ).subscribe((pts: SynthesePartialList) => {
            this.pointsSubject.next(pts.PageData);
            this.countSubject.next(pts.CountAll);
        } );
    }
}