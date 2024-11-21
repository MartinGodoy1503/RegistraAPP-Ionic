import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, AbstractControl, ValidatorFn } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertService } from '../alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.page.html',
  styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

  formulariosignup: FormGroup = this.fb.group({});

  constructor(
    public fb: FormBuilder, 
    private router: Router, 
    private alertService: AlertService
  ) {}

  ngOnInit() {
    this.formulariosignup = this.fb.group({
      username: new FormControl('', Validators.required),
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, this.passwordValidator]],
      password2: ['', [Validators.required]],
    }, {validator: this.passwordsMatchValidator});
  }

  passwordValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;
    if (control.value && !passwordRegex.test(control.value)) {
      return { invalidPassword: true };
    }
    return null;
  }

  passwordsMatchValidator: ValidatorFn = (control: AbstractControl): { [key: string]: boolean } | null => {
    const password = control.get('password');
    const password2 = control.get('password2');
    if (password && password2 && password.value !== password2.value) {
      return { mismatch: true };
    }
    return null;
  };

  async onSubmit() {
    if (this.formulariosignup.valid) {
      const message = 'Formulario de registro enviado correctamente!';
      await this.alertService.presentAlert('Éxito', message);
      
    } else {
      console.log('Formulario inválido');
    }
  }
}