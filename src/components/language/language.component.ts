import { ChangeDetectorRef, Component } from '@angular/core';
import { LanguageService } from './language.service';

@Component({
  selector: 'mds-language',
  templateUrl: './language.component.html',
  styleUrls: ['./language.component.scss']
})
export class LanguageComponent  {

	langs:Record<string, string>;
	langsID:string[]=[];
	currentLang:string;
	baseHref:string;

	constructor(
		private languageService: LanguageService,
		private cd: ChangeDetectorRef
		) {
		this.update();
		this.languageService.current$.subscribe((v)=>{
			this.update(v);
			if (this.cd) {
				this.cd.detectChanges();
			}
		});
	}

	update(v?:string) {
		this.langs = this.languageService.langs;
		this.baseHref = this.languageService.baseHref;
		this.langsID = this.languageService.langsID;
		this.currentLang = v || this.languageService._current;
	}

	switchLang(lang:string) {
		let newBaseHref = this.baseHref.replace(new RegExp(`\/${this.currentLang.replace(/\-/g,'\\-')}\/$`), `/${lang}/`);
		let newUrl = location.href.replace(this.baseHref, newBaseHref);
		newUrl = newUrl.replace(/^http:\/\//, 'https://');
		location.href = newUrl;
	}

}
