import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,

  ): boolean {
    const isLoggedIn = this.authService.isLoggedIn();
    const requiredRole = route.data['role']; // OBTENEMOS EL ROL REQUERIDO DESDE LAS RUTAS.
    const userRole = this.authService.getUserRole();

    if (!isLoggedIn) {
      this.router.navigate(['/login']); // REDIRIGIR SI NO ESTÁ AUTENTICADO
      return false;
    }

    if (requiredRole && userRole !== requiredRole) {
      this.router.navigate(['/login']);
       // REDIRIGIR SI EL ROL NO ES EL ADECUADO
       window.alert("La cuenta actual no cuenta con un rol válido.");
      return false;
    }

    return true;
  }
}