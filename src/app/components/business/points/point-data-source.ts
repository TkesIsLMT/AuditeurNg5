import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs/observable/of";
import { PointControle } from "../../../models/point-controle";
import { PointService } from "../points/point.service";
import { PointSynthesePartialList } from './models/point-synthese-partial-list';
import { PointSynthese } from "./models/point-synthese";

export class PointsDataSource implements DataSource<PointSynthese> {

    private pointsSubject = new BehaviorSubject<PointSynthese[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    
    public loading$ = this.loadingSubject.asObservable();

    constructor(private pointsService: PointService) {}

    connect(collectionViewer: CollectionViewer): Observable<PointControle[]> {
        return this.pointsSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.pointsSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    connectCount():Observable<number>{
        return this.countSubject.asObservable();
    }

    loadPoints(filter = '', sortColumn = '', sortDirection = true, pageIndex = 0, pageSize = 10) {

        this.loadingSubject.next(true);

        this.pointsService.findPoints(filter, sortColumn, sortDirection,
            pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((pts: PointSynthesePartialList) => {
            this.pointsSubject.next(pts.PageData);
            this.countSubject.next(pts.CountAll);
        } );
    }    
}