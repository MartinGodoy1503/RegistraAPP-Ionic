import { AuthService } from '../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {
  
  userName?: string;   // VARIABLE PARA ALMACENAR NOMBRE DEL USUARIO 
  userRole: string | null = ''; // VARIABLE PARA ALMACENAR EL ROL DEL USUARIO 
  
  constructor(private authService: AuthService, private router: Router ) { }
  

  ngOnInit(): void {
    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getUserRole();
    console.log(localStorage.getItem('usuario'));

  }

  goToPage(page: string) {
    this.router.navigate([`/${page}`]).then(
      success => {
        if (!success) {
          console.error('Error al navegar a:', page);
        }
      },
      error => console.error('Error en la navegación:', error)
    );
  }
}