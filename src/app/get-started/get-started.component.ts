import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mds-get-started',
  templateUrl: './get-started.component.html',
  styleUrls: ['./get-started.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-content'
  }
})
export class GetStartedComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
