import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { MDBBootstrapModule } from 'angular-bootstrap-md';
import { FooterComponent } from './footer/footer.component';

@NgModule({
  imports: [
    CommonModule,
    MDBBootstrapModule.forRoot(),
  ],
  declarations: [NavbarComponent, FooterComponent],
  exports: [NavbarComponent, FooterComponent]
})
export class ComponentsModule { }
