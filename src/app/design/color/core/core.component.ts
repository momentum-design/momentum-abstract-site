import { Component, OnInit } from '@angular/core';
import { ColorHelper } from '@lib';
import * as core from '../../../../assets/momentum/color/core.json';

const _core:Record<string,any>=core;

@Component({
  selector: 'mds-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  
  core:any[];
  decorative:any[];
  gradation:any[];
  mobile:any[];

  constructor() { 
    this.core = ColorHelper.htmlData(_core["core color"]);
    this.decorative = ColorHelper.htmlData(_core["decorative color"]);
    this.gradation = ColorHelper.htmlData(_core["gradation color"]);
    this.mobile = ColorHelper.htmlData(_core["mobile solid background"]);
  }

  ngOnInit(): void {

  }

}
