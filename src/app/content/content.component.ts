import { AfterViewInit, ChangeDetectionStrategy, ChangeDetectorRef, Component, NgZone, OnDestroy } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Router } from '@angular/router';
import { LanguageService, ContentService } from '@lib';

@Component({
	selector: 'mds-content',
	templateUrl: './content.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	styleUrls: ['./content.component.scss']
})
export class ContentComponent implements AfterViewInit, OnDestroy{

	currentLang:string='';
	content:string|SafeHtml;
	timer:any;

	constructor(
		private languageService:LanguageService,
		private contentService:ContentService,
		private cd: ChangeDetectorRef,
		private router: Router,
		private zone: NgZone
	) {
		this.currentLang = this.languageService._current;
		this.languageService.current$.subscribe((v)=>{
			this.currentLang = v;
		});
	}

	ngOnDestroy() {
		this.clear();
	}

	clear() {
		if(this.timer) {
			clearTimeout(this.timer);
		}
	}

	ngAfterViewInit() {
		const url = this.contentService.getUrl(this.router.url, this.currentLang);
		if(url !== this.contentService.currentUrl) {
			this.contentService.getContent(url)
			.then((str)=>{
				this.forceUpdate(str);
			})
			.catch((str)=>{
				this.forceUpdate(str);
			});
		}	
	}

	private forceUpdate(str?:string|SafeHtml) {
		this.clear();
		this.timer = setTimeout(()=>{
			if(str!==undefined) {
				this.content = str;
			}	
			if (this.cd) {
				this.cd.detectChanges();
			}	
		},1000);
	}

}
