import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss'],
})
export class AlumnoComponent  implements OnInit {

  userName?: string;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.userName = this.authService.getUserName();
  }

}
