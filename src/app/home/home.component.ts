import { AfterViewInit, ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
   templateUrl: './home.component.html',
   styleUrls:['./home.component.scss'],
   changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HomeComponent implements AfterViewInit {

   constructor(
      private router: Router
   ) {
      this.redirect();
   }

   redirect() {
      let match = location.href.split('#');
      if(match.length>1 && match[1].indexOf('/')===0) {
         console.log([match.slice(1).join('#')]);
         this.router.navigate([match.slice(1).join('#')]);
      }
   }

   ngAfterViewInit() {
   }

}
