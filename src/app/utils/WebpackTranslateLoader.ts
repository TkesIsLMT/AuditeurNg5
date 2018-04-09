// webpack-translate-loader.ts
import { TranslateLoader } from '@ngx-translate/core';
import { Observable } from 'rxjs/Observable';
import { fromPromise } from 'rxjs/observable/fromPromise';

export class WebpackTranslateLoader implements TranslateLoader {
  getTranslation(lang: string): Observable<any> {
    //return Observable.fromPromise(System.import(`../assets/i18n/${lang}.json`));
    return fromPromise(System.import(`../../assets/translations/${lang}.json`));
  }
}