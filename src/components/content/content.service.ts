import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LanguageService, RouteHelper } from '@lib';
import * as map from '../../database/content.json';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Injectable({
    providedIn: 'root'
})
export class ContentService {

    map:any;
    data: Record<string, string|SafeHtml>={};
    currentUrl:string;
    sortMax: 9999;

    constructor(
        private languageService:LanguageService,
        private httpClient: HttpClient,
        private sanitizer: DomSanitizer,
        ) {
        this.map = map;
    }

    getUrl(routeUrl:string, lang:string):string {
        return `./assets/data/${lang}/${RouteHelper.formatShortUrl(routeUrl)}.html`;
    }

    returnData(requestUrl:string, html:string=''):string|SafeHtml {
        if(this.data[requestUrl]===undefined) {
            this.data[requestUrl] = this.sanitizer.bypassSecurityTrustHtml(html);
        }
        if(this.currentUrl === requestUrl) {
            this.currentUrl = '';
            return this.data[requestUrl];
        } else {
            return 'loading';
        }
    }

    getContent(url:string):Promise<string|SafeHtml> {
        this.currentUrl = url;
        return new Promise((resolve ,reject)=>{
            if(this.data[url]!==undefined && this.data[url]!=='Not found') {
                resolve(this.returnData(url));
            }
            this.httpClient.get(url, {responseType: 'text'})
            .toPromise()
            .then((html)=>{
                resolve(this.returnData(url,html));
            }).
            catch((e)=>{
                resolve(this.returnData(url,'Not found'));
            });
        });
    }

    getMap(keys:string[]):any {
        let p:any = this.map[this.languageService._current];
        let ret = keys.every((k:any)=>{
            if(p[k]) {
                p = p[k];
                return true;
            } else {
                return false;
            }
        });
        return ret ? p : false;
    }

    getName(keys:string[]) {
        console.log(keys);
        if(keys.length<1) {
            return '';
        }
        const _m = this.getMap(keys);
        return _m ? _m[RouteHelper.dataKey].name: keys[keys.length-1];
    }

    getProp(keys:string[]) {
        const _me = this;
        if(keys.length<1) {
            return {
                name: '',
                sort: _me.sortMax++
            }
        }
        const _m = this.getMap(keys);
        return _m? {
            name: _m[RouteHelper.dataKey].name,
            sort: _m[RouteHelper.dataKey].sort
        } : {
            name: keys[keys.length-1],
            sort: _me.sortMax++
        };
    }

}
