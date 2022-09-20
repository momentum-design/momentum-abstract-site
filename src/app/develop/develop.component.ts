import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mds-develop',
  templateUrl: './develop.component.html',
  styleUrls: ['./develop.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-content'
  }
})
export class DevelopComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
