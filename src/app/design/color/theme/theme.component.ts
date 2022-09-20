import { Component, OnInit } from '@angular/core';
import { ColorHelper } from '@lib';
import * as theme from '../../../../assets/momentum/color/theme.json';

const _theme:Record<string,any>=theme;

@Component({
  selector: 'mds-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  dui:any[];
  lui:any[];
  common:any[];

  constructor() {
    this.dui = ColorHelper.htmlData(_theme.dui);
    this.lui = ColorHelper.htmlData(_theme.lui);
    this.common = ColorHelper.htmlData(_theme.common);
  }

  ngOnInit(): void {

  }

}
