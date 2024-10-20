import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'signup',
    loadChildren: () => import('./signup/signup.module').then( m => m.SignupPageModule)
  },
  {
    path: 'password-recovery',
    loadChildren: () => import('./password-recovery/password-recovery.module').then( m => m.PasswordRecoveryPageModule)
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then( m => m.ProfilePageModule),
    canActivate: [AuthGuard],
  },
  {
    path: 'qrcode',
    loadChildren: () => import('./qrcode/qrcode.module').then( m => m.QRcodePageModule),
    canActivate: [AuthGuard],
  },

  //LA PÁGINA DE ERROR 404 SIEMPRE DEBE ESTAR AL FINAL, YA QUE PUEDE INTERCEPTAR OTRA RUTA PROVOCANDO QUE SALTE EL ERROR CUANDO NO SE DEBA.
  {
    path: '**',
    loadChildren: () => import('./not-found-page/not-found-page.module').then( m => m.NotFoundPagePageModule)
  },

];



@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
