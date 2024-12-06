import { Component, OnInit } from '@angular/core';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { AuthService } from 'src/app/services/auth.service';
import * as QRCode from 'qrcode';
import { switchMap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { formatDate } from '@angular/common';
import QrScanner from 'qr-scanner';



interface Asignatura {
  id: string;
  nombre: string;
  alumnos: string[];
  horarios: { dia: string; horaInicio: string; horaFin: string }[];
}

interface NuevaAsistencia {
  asignatura: Asignatura | null;
  horarioSeleccionado: { dia: string; horaInicio: string; horaFin: string } | null;
}

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss'],
})

export class ProfesorComponent implements OnInit {
  userName: string = ''; // Nombre del profesor
  profesorId: string = ''; // ID del profesor autenticado
  asignaturas: any[] = [];
  asistencias: any[] = [];
  mostrarFormulario: boolean = false;
  qrModalOpen: boolean = false;
  qrCodeUrl: string | null = null;

  nuevaAsistencia: NuevaAsistencia = {
    asignatura: null,
    horarioSeleccionado: null,
  };

  constructor(
    private authService: AuthService,
    private asistenciaService: AsistenciaService,
    private router: Router
  ) {}

  ngOnInit() {
    // Verificar si el usuario está autenticado
    if (!this.authService.isLoggedIn()) {
      this.router.navigate(['/login']); // Redirigir al login si no está autenticado
      return;
    }

    // Obtener el nombre y ID del usuario autenticado
    this.userName = this.authService.getUserName();
    this.profesorId = this.authService.getUserId() || '';

    // Cargar las asignaturas asociadas al profesor
    this.cargarAsignaturas();
  }

  // Cargar asignaturas del profesor
  cargarAsignaturas() {
    this.asistenciaService.obtenerAsignaturasPorProfesor(this.profesorId).subscribe(
      (data) => {
        this.asignaturas = data;
        console.log(this.asignaturas); // Verifica si los datos contienen la propiedad 'horarios'
      },
      (error) => {
        console.error('Error al cargar asignaturas:', error);
      }
    );
  }
  

  seleccionarHorario(event: any) {
    // Obtén el valor del horario seleccionado
    const horarioSeleccionado = event.detail.value;
    
    if (horarioSeleccionado) {
      this.nuevaAsistencia.horarioSeleccionado = horarioSeleccionado;
      console.log('Horario seleccionado:', this.nuevaAsistencia.horarioSeleccionado);
    } else {
      console.log('No se seleccionó ningún horario');
    }
  }
  
  
  

  // Registrar nueva asistencia
  registrarNuevaAsistencia() {
    if (this.nuevaAsistencia.asignatura && this.nuevaAsistencia.horarioSeleccionado) {
      const fecha = formatDate(new Date(), 'yyyy-MM-dd', 'en');
      const alumnos = this.nuevaAsistencia.asignatura.alumnos.map((id: string) => ({
        id,
        asistio: false,
      }));
  
      const nuevaAsistencia = {
        fecha,
        alumnos,
      };
  
      const asignaturaId = this.nuevaAsistencia.asignatura.id;
  
      this.asistenciaService.registrarAsistencia(asignaturaId, fecha, nuevaAsistencia).subscribe(
        (response) => {
          this.generarQrCode(asignaturaId, fecha);
          this.mostrarFormulario = false;
        },
        (error) => {
          console.error('Error al registrar asistencia:', error);
        }
      );
    } else {
      alert('Por favor, selecciona una asignatura y horario.');
    }
  }
  

  // Generar un código QR para la asistencia
  generarQrCode(asignaturaId: string, fecha: string): void {
    try {
      // Datos que queremos codificar en el QR
      const qrData = { asignaturaId, fecha };
  
      // Generar el código QR como un Data URL
      QRCode.toDataURL(JSON.stringify(qrData), { errorCorrectionLevel: 'H' })
        .then((url) => {
          this.qrCodeUrl = url; // Asigna el URL generado al componente
          this.qrModalOpen = true; // Abre el modal con el QR
        })
        .catch((error) => {
          console.error('Error generando el código QR:', error);
        });
    } catch (error) {
      console.error('Error inesperado al generar el código QR:', error);
    }
  }

  // Eliminar asistencia de la lista (puede implementarse para eliminar en el servidor también)
  eliminarAsistencia(index: number) {
    this.asistencias.splice(index, 1);
  }
}