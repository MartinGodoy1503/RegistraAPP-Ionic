import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { BehaviorSubject, catchError, map, Observable, throwError } from 'rxjs';

import { DBTaskService } from './dbtask.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  //CURRENT USER = USUARIO ACTUAL
  //USER SUBJECT = ASUNTO DEL USUARIO

  private apiUrl = 'http://localhost:3000/usuarios'; // SERVIDOR JSON
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  private userName?: string;
  
  constructor(private http: HttpClient, private router: Router) {
    // SE INTENTA OBTENER EL USUARIO ALMACENADO EN LOCALSTORAGE
    this.currentUserSubject = new BehaviorSubject<any>(JSON.parse(localStorage.getItem('currentUser') || '{}'));
    this.currentUser = this.currentUserSubject.asObservable();
   }
  
    // OBTENER EL VALOR ACTUAL DEL USUARIO 
  public get currentUserValue(): any {
    return this.currentUserSubject.value;
  }

  // METODO PARA MANEJAR EL INICIO DE SESION
  login(username: string, password: string) {
        // PRIMERO SE IDENTIFICA CON JSON
    return this.http.get<any[]>(`${this.apiUrl}?username=${username}&password=${password}`).pipe(
      map(users => {
        // SI SE ENCUENTRA SE ALMACENA
        if (users.length > 0) {
          const user = users[0];
          localStorage.setItem('currentUser', JSON.stringify(user));
          this.currentUserSubject.next(user);
          return user;
        } else {
          // SINO SE UTILIZA CREDENCIALES FIJAS
          return this.loginCredencialesFijas(username, password);
        }
      }),
      // CAPTURAR ERROR EL PETICION GET
      catchError(err => {
        console.error(err);
        return throwError('Error en la autenticación');
      })
    );
  }

  private loginCredencialesFijas(username: string, password: string) {
    if (username === 'admin' && password === 'admin') {
      const user = {
        id: '1000',
        username: 'admin',
        rol: 'admin', 
        nombre: 'profesor'
      };

  constructor(private dbTask: DBTaskService) { }

      localStorage.setItem('currentUser', JSON.stringify(user));
      this.currentUserSubject.next(user);
      return user;
    } else {
      throw new Error('Credenciales inválidas');
    }
  }

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    if (user) {
      // CONVERTIR DE STRING A OBJETO
      return JSON.parse(user); 
    }
    // SI NO HAY USUARIO LOGUEADO
    return null; 

  async login(username: string, password: string): Promise<boolean> {
    const user = await this.dbTask.getUser(username, password);

    if (user) {
      this.isLoggedIn = true;
      localStorage.setItem('userName', username); 
      return true;
    }

    return false;
  }

  logout() {
    // ELIMINA AL USUARIO DE LOCALSTORAGE Y ACTUALIZAMOS EL ESTADO A NULL
    localStorage.removeItem('currentUser');
    
    this.currentUserSubject.next(null);
    // REDIRIGIR AL USUARIO A LA PAGINA DE INICIO DE SESION
    this.router.navigate(['/login']);
  }

   // VERIFICAR SI EL USUARIO ESTÁ AUTENTICADO
   isLoggedIn(): boolean {
    return !!localStorage.getItem('currentUser');
  }

  // OBTENER EL ROL DEL USUARIO ACTUALMENTE AUTENTICADO
  getUserRole(): string | null {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    // SI EL USUARIO TIENE UN ROL, LO DEVOLVEMOS
    return user?.rol || null; 
  }

  // OBTENER EL ID DEL USUARIO ACTUAL
  getUserId(): string | null {
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    return user?.id || null;
  }

  setUserName(name: string) {
    this.userName = name;
    localStorage.setItem('userName', name);
  }

  getUserName(): string {
    return localStorage.getItem('userName') || this.userName || '';
  }
}