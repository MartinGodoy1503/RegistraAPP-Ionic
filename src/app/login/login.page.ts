import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  formulariologin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private authService: AuthService
  ) {
    // Inicialización del formulario
    this.formulariologin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    // Si necesitas inicializar algo adicional al inicio
  }

  async onSubmit() {
    if (this.formulariologin.valid) {
      const username = this.formulariologin.get('username')?.value;
      const password = this.formulariologin.get('password')?.value;

      // Asignar el nombre de usuario al servicio de autenticación
      this.authService.setUserName(username);

      try {
        const loginResponse = await this.authService.login(username, password).toPromise();

        // Si se autentica correctamente
        if (loginResponse) {
          const userData = {
            id: loginResponse.id,
            username: loginResponse.username,
          };

          localStorage.setItem('usuario', JSON.stringify(userData));
          this.router.navigate(['/home']);
        } else {
          alert('Credenciales incorrectas. Intenta de nuevo.');
        }
      } catch (err) {
        console.error(err);
        alert('Error durante la autenticación. Verifica tus credenciales.');
      }
    } else {
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}
