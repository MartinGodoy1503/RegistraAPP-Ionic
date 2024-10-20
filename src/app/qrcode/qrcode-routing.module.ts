import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { QRcodePage } from './qrcode.page';
import { AuthGuard } from '../guards/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: QRcodePage
  },
  {
    path: 'alumno-qr',
    loadChildren: () => import('../modules/alumno/alumno.module').then(m => m.AlumnoModule),
    canActivate: [AuthGuard],
    data: { role: 'alumno' }
  },
  {
    path: 'profesor-qr',
    loadChildren: () => import('../modules/profesor/profesor.module').then(m => m.ProfesorModule),
    canActivate: [AuthGuard],
    data: { role: 'profesor' }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class QRcodePageRoutingModule {}
