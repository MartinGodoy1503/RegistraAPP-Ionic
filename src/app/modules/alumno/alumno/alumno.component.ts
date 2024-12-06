import { Component, ElementRef, ViewChild, OnDestroy, OnInit } from '@angular/core';
import { QRScannerService } from 'src/app/services/qr-scanner.service';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.component.html',
  styleUrls: ['./alumno.component.scss'],
})  
export class AlumnoComponent implements OnInit, OnDestroy {
  @ViewChild('videoElement', { static: false }) videoElement!: ElementRef<HTMLVideoElement>;
  codigoQR: string | null = null;
  asistencias: any[] = [];

  constructor(
    private qrScannerService: QRScannerService,
    private asistenciaService: AsistenciaService,
    private authService: AuthService
  ) {}

  userName?: string;

  ngOnInit() {
    this.cargarAsistencias();
    this.userName = this.authService.getUserName();
    this.cargarAsistencias();
  }

  abrirCamara() {
    if (this.videoElement) {
      this.qrScannerService.startScanning(this.videoElement.nativeElement).subscribe({
        next: (qrCode) => {
          this.codigoQR = qrCode;
          this.marcarAsistencia(qrCode);
        },
        error: (error) => {
          console.error('Error en el escaneo:', error);
          alert('No se pudo completar el escaneo.');
        },
      });
    }
  }

  marcarAsistencia(codigoQR: string) {
    try {
      const parsedData = JSON.parse(codigoQR);
      const { asignaturaId, fecha } = parsedData;
  
      if (!asignaturaId || !fecha) {
        throw new Error('QR no válido.');
      }
  
      const usuarioId = this.authService.getUserId();
      if (!usuarioId) {
        alert('Usuario no identificado.');
        return;
      }
  
      this.asistenciaService.actualizarAsistenciaConQR(asignaturaId, usuarioId, fecha).subscribe({
        next: () => {
          alert('Asistencia registrada con éxito.');
          this.cargarAsistencias();
        },
        error: (err) => {
          console.error('Error al marcar asistencia:', err);
          alert('Hubo un error al marcar la asistencia.');
        },
      });
    } catch (error) {
      console.error('Error procesando el QR:', error);
      alert('El código QR es inválido.');
    }
  }

  cargarAsistencias() {
    const usuarioId = this.authService.getUserId();
    if (!usuarioId) return;
  
    this.asistenciaService.obtenerAsistenciasPorAlumnoId(usuarioId).subscribe({
      next: (data) => (this.asistencias = data),
      error: (err) => console.error('Error al cargar asistencias:', err),
    });
  }

  ngOnDestroy() {
    this.qrScannerService.stopScanning();
  }
}
