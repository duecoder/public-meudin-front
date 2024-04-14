import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenuComponent } from './menu.component';
import { MenubarModule } from 'primeng/menubar';
import { TabMenuModule } from 'primeng/tabmenu';
@NgModule({
  declarations: [MenuComponent],
  imports: [
    CommonModule,
    MenubarModule,
    TabMenuModule
  ],
  exports: [MenuComponent]
})
export class MenuModule { }
