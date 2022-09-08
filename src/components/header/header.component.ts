import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, ViewChild, ViewContainerRef } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';

interface INav {
  path: string,
  name: string
}

@Component({
  selector: 'mds-header',
  templateUrl: './header.component.html',
  styleUrls:['./header.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderComponent implements AfterViewInit  {

  motion:any;
  isShowMenu:boolean = false;
  public navs: INav[];
  public title: string = '';

  constructor(
    private router: Router
    ) {
    this.initNav();
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.title = event.url.split('/')[1] || '';
      }
    });
  }

  ngAfterViewInit() {

  }

  private initNav() {
    this.navs = this.router.config.filter((cfg)=>{
      return cfg.data && typeof cfg.data.navIndex === 'number';
    }).sort((cfg1,cfg2)=>{
      if(cfg1.data && cfg2.data) {
        return cfg1.data.navIndex - cfg2.data.navIndex;
      }
      return -1;
    }).map((cfg)=>{
      return {
        path: cfg.path || '',
        name: cfg.data?.name || '',
      }
    });
  }

}
