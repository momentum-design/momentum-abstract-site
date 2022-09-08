import { NgModule } from '@angular/core';
import { FooterModule } from './footer';
import { HeaderModule } from './header';
import { LanguageModule } from './language';

@NgModule({
  exports: [
    FooterModule,
    HeaderModule,
    LanguageModule
  ],
  imports: [
      FooterModule,
      HeaderModule,
      LanguageModule
  ]
})
export class ComponentsModule {}
