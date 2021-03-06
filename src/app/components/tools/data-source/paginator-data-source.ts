import { Observable } from "rxjs/Observable";
import { DataSource } from '@angular/cdk/collections';

export abstract class PaginatorDataSource<T> extends DataSource<T> {
    filterValue: string;
    sortDataColumn: string;
    sortDirection: boolean;
    currentPageNumber: number;
    currentPageSize: number;
    abstract loadPartialData ():void;
    abstract countData ():Observable<number>;
}

