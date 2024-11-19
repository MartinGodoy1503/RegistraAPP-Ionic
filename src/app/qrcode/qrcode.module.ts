import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { QRcodePageRoutingModule } from './qrcode-routing.module';

import { QRcodePage } from './qrcode.page';
import { ProfesorQrComponent } from '../modules/profesor-qr/profesor-qr.component';
import { AlumnoQrComponent } from '../modules/alumno-qr/alumno-qr.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    QRcodePageRoutingModule
  ],
  declarations: [
    QRcodePage,
    AlumnoQrComponent,
    ProfesorQrComponent
  ],
  exports: [
    AlumnoQrComponent, 
    ProfesorQrComponent]
})
export class QRcodePageModule {}
