import { Component, OnInit } from '@angular/core';
import * as theme from '../../../../assets/momentum/font/theme.json';

const _theme:Record<string,any>=theme;

@Component({
  selector: 'mds-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  apps:any[];
  display:any[];

  constructor() { 
    this.apps = Object.keys(_theme.apps).map((key)=>{
      return {
        token: key,
        value: _theme.apps[key],
        class: `apps_${key}`
      }
    });
    this.display = Object.keys(_theme.display).map((key)=>{
      return {
        token: key,
        value: _theme.display[key],
        class: `display_${key}`
      }
    });
  }

  ngOnInit(): void {
  }

}
