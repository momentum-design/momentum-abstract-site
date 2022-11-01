import { ChangeDetectionStrategy, Component, OnInit } from '@angular/core';

@Component({
  selector: 'mds-components',
  templateUrl: './components.component.html',
  styleUrls: ['./components.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    class: 'app-content'
  }
})
export class ComponentsComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
