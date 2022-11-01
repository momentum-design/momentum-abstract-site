import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { PlatformLocation } from '@angular/common';

@Injectable({
  	providedIn: 'root'
})
export class LanguageService {

	langs:Record<string, string> = {
		'en-US': 'EN',
		'zh': '中'
	};
	langsID:string[];
	baseHref:string;

	_current:string = 'en-US';
	private current = new Subject<any>();
	current$ = this.current.asObservable();

	constructor(private platformLocation: PlatformLocation) {
		this.init();
		this.initValue();
	}

	init() {
		this.current$.subscribe(v => {
			this._current = v;
		});
		this.langsID = Object.keys(this.langs);
	}

	initValue() {
		this.baseHref = this.platformLocation.getBaseHrefFromDOM();
		const _current = this.langsID.find((id)=>{
			return new RegExp(`\/${id.replace(/\-/g,'\\-')}\/$`).test(this.baseHref);
		}) || 'en-US';
		this.langsID.sort((a,b)=>{
			return b === _current ? 1 : 0;
		});
		this.current.next(_current);
	}

}
