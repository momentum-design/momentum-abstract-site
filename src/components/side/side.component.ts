import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { NavigationEnd, RouteConfigLoadEnd, Router } from '@angular/router';
import { RouteHelper, ContentService } from '@lib';

interface INav {
  data:any;
  children: INav[];
}

@Component({
  selector: 'mds-side',
  templateUrl: './side.component.html',
  styleUrls: ['./side.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SideComponent {

  navs:any[] = [];
  navsStructors: any[] = [];
  structors: Record<string, any> = {};
  lv1:string;
  lv2:string;

  constructor(
    private router: Router,
    private cd: ChangeDetectorRef,
    private contentService: ContentService //need get sort for folder
    ) {
    this.router.events.subscribe((event) => {
      if(event instanceof NavigationEnd) {
        this.onRoute();
      }
      if(event instanceof RouteConfigLoadEnd) {
        if(event.route.data) {
          this.addSub(event.route.data);
        }
      }
    });
  }

  private _sort(a:any,b:any) {
    return a.data.sort -b.data.sort;
  }

  private forceUpdate() {
    let navs = this.navsStructors.find((n)=>{
      return n.data.id === this.lv1;
    });
    this.navs = navs ? navs.children : [];
    this.navs.sort(this._sort);
    this.navs.forEach((_nav)=>{
      if(_nav.children) {
        _nav.children.sort(this._sort);
      }
    });
    if (this.cd) {
      this.cd.detectChanges();
    }
  }

  toArray(node: any) {
    return Object.keys(node).filter((key)=>{
      return key!== RouteHelper.dataKey;
    }).map((key)=>{
      return node[key][RouteHelper.dataKey];
    });
  }

  _build(node:any):INav {
    let newNode:INav = {
      data: {},
      children:[]
    };
    Object.keys(node).forEach((key)=>{
      if(key===RouteHelper.dataKey) {
        Object.assign(newNode.data, node[key]);
      } else {
        newNode.children.push(this._build(node[key]));
      }
    });
    return newNode;
  }

  build() {
    this.navsStructors = this._build(this.structors).children;
    this.navsStructors.sort(this._sort);
  }

  addSub(data:any) {
    const arr = RouteHelper.getSteps(data.fullPath);
    if(arr.length>0) {
      let p = this.structors;
      arr.forEach((step, index)=>{
        if(p[step]===undefined) {
          p[step] = {};
          p[step][RouteHelper.dataKey] = this.contentService.getProp(arr.slice(0, index+1));
        }
        p = p[step]; 
        if(index===arr.length-1) {
          p[RouteHelper.dataKey] = data;
        }
      });
    }
    this.build();
    this.forceUpdate();
  }

  onRoute() {
    const steps = RouteHelper.getSteps(this.router.url);
    this.lv1 = steps.length>0 ? steps[0]:'$root';
    this.lv2 = steps.length>1 ? steps[1]:'';
    this.forceUpdate();
  }

}
