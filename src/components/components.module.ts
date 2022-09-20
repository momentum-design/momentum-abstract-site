import { NgModule } from '@angular/core';
import { FooterModule } from './footer';
import { HeaderModule } from './header';
import { LanguageModule } from './language';
import { SideModule } from './side';

@NgModule({
  exports: [
    FooterModule,
    HeaderModule,
    LanguageModule,
    SideModule
  ],
  imports: [
      FooterModule,
      HeaderModule,
      LanguageModule,
      SideModule
  ]
})
export class ComponentsModule {}
