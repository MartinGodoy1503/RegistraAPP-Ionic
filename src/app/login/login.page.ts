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

  formulariologin: FormGroup = this.fb.group({});

  constructor(
    public fb: FormBuilder, 
    private router: Router, 
    private authService: AuthService
  ) {
    // Definir la estructura del formulario
    this.formulariologin = this.fb.group({
      'username': new FormControl("", Validators.required),
      'password': new FormControl("", Validators.required)
    });
  }

  ngOnInit() {
    this.formulariologin = this.fb.group({
      username: ['', [Validators.required]],
      password: ['', [Validators.required]],
    });
  }

  async onSubmit() {
<<<<<<< HEAD
    if (this.formulariologin.valid) {  
      const username = this.formulariologin.get('username')?.value;
      const password = this.formulariologin.get('password')?.value;
      this.authService.setUserName(username);
      if (await this.authService.login(username, password)) {
        this.router.navigate(['/home']);
      } else {
        alert('Credenciales incorrectas. Intenta de nuevo.');
      }
    }
    //H 
  }
}
=======
    if (this.formulariologin.valid) {
      // Obtener las credenciales del formulario
      const username = this.formulariologin.get('username')?.value;
      const password = this.formulariologin.get('password')?.value; 
  
      // Establecer el nombre de usuario en el servicio
      this.authService.setUserName(username);
  
      // Llamar al método login pasando el username y password
      this.authService.login(username, password).subscribe({
        next: (user) => {
          // Al recibir un usuario válido, almacenarlo en localStorage
          const userData = {
            id: user.id,
            username: user.username,
          };

          localStorage.setItem('usuario', JSON.stringify(userData));
          
          // Redirigir a la página principal (home)
          this.router.navigate(['/home']);
        },
        error: (err) => {
          // Si hay un error, mostrar un mensaje
          console.error(err);
          alert('Credenciales inválidas');
        }
      });
    } else {
      // Si el formulario no es válido, mostrar alerta
      alert('Por favor, completa todos los campos requeridos.');
    }
  }
}
>>>>>>> nueva-rama-evaluacion
