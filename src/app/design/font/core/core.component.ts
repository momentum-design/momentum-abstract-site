import { Component, OnInit } from '@angular/core';
import * as core from '../../../../assets/momentum/font/core.json';

const _core:Record<string,any>=core;

@Component({
  selector: 'mds-core',
  templateUrl: './core.component.html',
  styleUrls: ['./core.component.scss']
})
export class CoreComponent implements OnInit {
  
  core:any[];

  constructor() { 
    this.core = Object.keys(_core.size).map((key)=>{
      return {
        token: key,
        class: key,
        value: _core.size[key]
      }
    });
  }

  ngOnInit(): void {
  }

}
