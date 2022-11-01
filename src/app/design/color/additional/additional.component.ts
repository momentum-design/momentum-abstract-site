import { Component, OnInit } from '@angular/core';
import { ColorHelper } from '@lib';
import * as additional from '../../../../assets/momentum/color/additional.json';

const _additional:Record<string,any>=additional;

@Component({
  selector: 'mds-additional',
  templateUrl: './additional.component.html',
  styleUrls: ['./additional.component.scss']
})
export class AdditionalComponent implements OnInit {

  dui:any[];
  lui:any[];
  common:any[];

  constructor() {
    this.dui = ColorHelper.htmlData(_additional.dui);
    this.lui = ColorHelper.htmlData(_additional.lui);
    this.common = ColorHelper.htmlData(_additional.common);
  }

  ngOnInit(): void {
  }

}
