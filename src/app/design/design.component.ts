import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mds-design',
  templateUrl: './design.component.html',
  styleUrls: ['./design.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-content'
  }
})
export class DesignComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
