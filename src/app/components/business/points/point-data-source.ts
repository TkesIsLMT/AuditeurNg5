import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs/observable/of";

import { PointControle } from "../../../models/point-controle";
import { PointService } from "../points/point.service";
import { PointSynthesePartialList } from './models/point-synthese-partial-list';
import { PointSynthese } from "./models/point-synthese";
import { CustomPaginatorDataSource, ICustomPaginator } from "../../tools/custom-paginator/custom-paginator.data-source";
import { GlobalInfo } from "../../../services/global-info.service";

export class PointsDataSource implements CustomPaginatorDataSource<PointSynthese> {
    filterValue: string;
    sortDataColumn: string;
    sortDirection: boolean;
    currentPageNumber: number;
    currentPageSize: number;
    private pointsSubject = new BehaviorSubject<PointSynthese[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);

    public loading$ = this.loadingSubject.asObservable();

    constructor(private pointsService: PointService, private globals: GlobalInfo) {
        this.sortDataColumn = "Id";
        this.sortDirection = true;
        this.currentPageSize = this.globals.defaultPageSize;
    }

    connect(collectionViewer: CollectionViewer): Observable<PointControle[]> {
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
        this.load(this.filterValue,this.sortDataColumn,this.sortDirection, this.currentPageNumber,this.currentPageSize);
    }


    private load(filter = '', sortColumn = '', sortDirection = true, pageIndex = 0, pageSize = this.globals.defaultPageSize) {
        this.loadingSubject.next(true);

        this.pointsService.findPoints(filter, sortColumn, sortDirection,
            pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() =>  this.loadingSubject.next(false))
        ).subscribe((pts: PointSynthesePartialList) => {
            this.pointsSubject.next(pts.PageData);
            this.countSubject.next(pts.CountAll);
        } );
    }    
}