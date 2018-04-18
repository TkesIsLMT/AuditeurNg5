import { Injectable } from "@angular/core";

@Injectable()
export class GlobalInfo {
    defaultPageSize :number = 50;
    defaultPageSizeList: number[] = [10, 25, 50, 100, 250];
}