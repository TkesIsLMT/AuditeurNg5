import {CollectionViewer, DataSource} from "@angular/cdk/collections";
import {Observable} from "rxjs/Observable";
import {BehaviorSubject} from "rxjs/BehaviorSubject";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs/observable/of";

import { Categorie } from "../../../models/categorie";
import { CategorieSynthese } from "./models/categorie-synthese";
import { CategorieSynthesePartialList } from "./models/categorie-synthese-partial-list";
import { CategorieService } from "./categorie.service";

export class PointsDataSource implements DataSource<CategorieSynthese> {

    private categoriesSubject = new BehaviorSubject<CategorieSynthese[]>([]);
    private loadingSubject = new BehaviorSubject<boolean>(false);
    private countSubject = new BehaviorSubject<number>(0);
    
    public loading$ = this.loadingSubject.asObservable();

    constructor(private categoriesService: CategorieService) {}

    connect(collectionViewer: CollectionViewer): Observable<CategorieSynthese[]> {
        return this.categoriesSubject.asObservable();
    }

    disconnect(collectionViewer: CollectionViewer): void {
        this.categoriesSubject.complete();
        this.loadingSubject.complete();
        this.countSubject.complete();
    }

    connectCount():Observable<number>{
        return this.countSubject.asObservable();
    }

    loadPoints(filter = '', sortColumn = '', sortDirection = true, pageIndex = 0, pageSize = 10) {

        this.loadingSubject.next(true);

        this.categoriesService.findCategories(filter, sortColumn, sortDirection,
            pageIndex, pageSize).pipe(
            catchError(() => of([])),
            finalize(() => this.loadingSubject.next(false))
        )
        .subscribe((pts: CategorieSynthesePartialList) => {
            this.categoriesSubject.next(pts.PageData);
            this.countSubject.next(pts.CountAll);
        } );
    }    
}