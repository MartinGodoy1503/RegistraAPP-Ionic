import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { AsistenciaService

 } from 'src/app/services/asistencia.service';
@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss'],
})
export class AlumnoComponent  implements OnInit {

  userName?: string;
  asistencias: any[] = [];
  
  constructor(private authService: AuthService, private asistenciaService: AsistenciaService) { }

  ngOnInit() {
    this.userName = this.authService.getUserName();
  const alumnoId = this.authService.getUserId();

  if (alumnoId) {

    //LLAMADA SEGURA
    this.cargarAsistencias(alumnoId); 
  } else {
    console.error('No se encontró el ID del alumno.');
  }
  }

  // MÉTODO PARA CARGAR LAS ASISTENCIAS DEL ALUMNO
  cargarAsistencias(alumnoId: string) {
    this.asistenciaService.getAsistenciasByAlumno(alumnoId).subscribe(
      (res) => {
        this.asistencias = res;
        console.log('Asistencias:', this.asistencias);
      },
      (err) => console.error('Error al cargar asistencias:', err)
    );
  }
}
