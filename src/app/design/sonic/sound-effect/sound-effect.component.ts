import { Component, OnInit } from '@angular/core';
import * as _database from '../../../../database/sonic.json';

const database: Record<string, Record<string, any>> = _database;

@Component({
  selector: 'mds-sound-effect',
  templateUrl: './sound-effect.component.html',
  styleUrls: ['./sound-effect.component.scss']
})
export class SoundEffectComponent implements OnInit {

  sounds: any[];

  constructor() {
    this.sounds = [];

    Object.keys(database).forEach((key)=>{
      if(key!=='default') {
        this.sounds.push({
          name: key,
          files: Object.keys(database[key]).map((fname)=>{
            return {
              name: fname,
              src: `assets/momentum/sonic/${key}/${fname}.mp3`
            }
          })
        });
      }
    });
  }

  ngOnInit(): void {

  }

}
