import { Component } from '@angular/core';
import { PlatformLocation } from '@angular/common';

@Component({
  selector: 'mds-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent  {

	langs:Record<string, string> = {
		'en-US': 'EN',
		'zh': '中'
	};
	langIDs:string[];
	currentLang:string = 'en-US';
	baseHref:string;

	constructor(private platformLocation: PlatformLocation) {
		this.baseHref = this.platformLocation.getBaseHrefFromDOM();
		let ids = Object.keys(this.langs);
		this.currentLang = ids.find((id)=>{
			return new RegExp(`\/${id.replace(/\-/g,'\\-')}\/$`).test(this.baseHref);
		}) || 'en-US';
		this.langIDs = ids.sort((a,b)=>{
			return b === this.currentLang ? 1 : 0;
		});
	}

	switchLang(lang:string) {
		let newBaseHref = this.baseHref.replace(new RegExp(`\/${this.currentLang.replace(/\-/g,'\\-')}\/$`), `/${lang}/`);
		console.log(newBaseHref);
		location.href = location.href.replace(this.baseHref, newBaseHref);
	}

}
