import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

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
export class HeaderComponent {

  public navs: INav[];

  constructor(
    private router: Router
    ) {
    this.initNav();
  }

  private initNav() {
    this.navs = this.router.config.filter((cfg)=>{
      return cfg.data && typeof cfg.data.sort === 'number';
    }).sort((cfg1,cfg2)=>{
      if(cfg1.data && cfg2.data) {
        return cfg1.data.sort - cfg2.data.sort;
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
