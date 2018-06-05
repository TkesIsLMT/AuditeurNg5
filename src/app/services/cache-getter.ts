import { Observable } from "rxjs/Observable";
import { Subject } from "rxjs/Subject";
import { takeUntil, shareReplay, map } from "rxjs/operators";

export class CacheGetter<T>{

    private cache$: Observable<T>;
    private reload$ = new Subject<void>();
  
    forceReload(){
      this.reload$.next();
      this.cache$ = null;
    }
    
    get data(){
      if (!this.cache$) {
        this.cache$ = this.getData().pipe(
          takeUntil(this.reload$),
          shareReplay(1)
        );
      }  
      return this.cache$;
    }

    private getData:()=>Observable<T>;
    constructor(getDataFn:()=>Observable<T>){
        this.getData = getDataFn;
    }


}