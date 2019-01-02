import { AppRoutingModule } from './../app-routing.module';
import { MaterialModule } from './../material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FooterComponent } from './footer/footer.component';
import { SidenavComponent } from './sidenav/sidenav.component';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    AppRoutingModule,
  ],
  declarations: [FooterComponent, SidenavComponent],
  exports: [FooterComponent, SidenavComponent]
})
export class ComponentsModule { }
