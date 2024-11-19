import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { AuthService } from 'src/app/services/auth.service';
import { ModalController } from '@ionic/angular';
import * as QRCode from 'qrcode';

@Component({
  selector: 'app-profesor',
  templateUrl: './profesor.component.html',
  styleUrls: ['./profesor.component.scss'],
})
export class ProfesorComponent implements OnInit {
  
  userName?: string;
  asistencias: any[] = []; // LISTA DE ASISTENCIAS
  qrCodeUrl: string = '';  //VARIABLE DEL QR GENERADO

  // NUEVA ASISTENCIA A REGISTRAR
  nuevaAsistencia = {
    id: undefined,
    fecha: '',
    hora: '',
    asistio: false,
    asignatura: {
      id: 1,
      nombre: '',
    },
  };

  constructor(
    private authService: AuthService,
    private asistenciaService: AsistenciaService,
    private modalCtrl: ModalController
  ) {}

  ngOnInit() {
    this.userName = this.authService.getUserName(); 
    this.cargarAsistencias();
  }

  // MÉTODO PARA CARGAR LAS ASISTENCIAS
  cargarAsistencias() {
    this.asistenciaService.getAsistencias().subscribe(
      (res) => {
        this.asistencias = res; 
      },
      (err) => console.error('Error al cargar asistencias:', err)
    );
  }
  
  editarAsistencia(asistencia: any) {
    this.nuevaAsistencia = { ...asistencia }; // CARGAR LOS DATOS EN EL FORMULARIO
    document.getElementById('open-modal')?.click(); // ABRIR EL MODAL DE EDICIÓN
  }
  
  // MÉTODO PARA ACTUALIZAR UNA ASISTENCIA EXISTENTE
  actualizarAsistencia() {
    if (!this.nuevaAsistencia.fecha || !this.nuevaAsistencia.hora) {
      alert('Faltan datos en la asistencia');
      return;
    }
  
    this.asistenciaService.updateAsistencia(this.nuevaAsistencia).subscribe(
      () => {
        console.log('Asistencia actualizada exitosamente');
        this.cargarAsistencias(); // RECARGAR LA LISTA DE ASISTENCIAS
        this.resetFormulario();
        this.Cerrar(); 
      },
      (error) => console.error('Error al actualizar asistencia:', error)
    );
  }

  // MÉTODO PARA AGREGAR UNA NUEVA ASISTENCIA
  agregarAsistencia() {
    if (!this.nuevaAsistencia.fecha || !this.nuevaAsistencia.hora) {
      alert('Faltan datos en la nueva asistencia');
      return;
    }

    const asistencia = {
      ...this.nuevaAsistencia,
    };

    this.asistenciaService.addAsistencia(asistencia).subscribe(
      (res: any) => {
        console.log('Asistencia agregada exitosamente');
        this.cargarAsistencias();
        this.resetFormulario();
        this.generarCodigoQR(res.id);
      },
      (error) => console.error('Error al agregar asistencia:', error)
    );
    
  }

   // MÉTODO PARA GENERAR
   generarCodigoQR(asistenciaId: string) {
    const qrData = JSON.stringify({
      asistenciaId: asistenciaId,
    });

    QRCode.toDataURL(qrData)
    .then((url: string) => {
      this.qrCodeUrl = url; 
    })
    .catch((err: Error) => console.error('Error al generar el código QR:', err.message));

  }

  // MÉTODO PARA ELIMINAR UNA ASISTENCIA ESPECÍFICA

  eliminarAsistencia(index: number) {
    const asistenciaId = this.asistencias[index].id; 
    this.asistenciaService.deleteAsistenciaById(asistenciaId).subscribe(
      () => {
        console.log('Asistencia eliminada exitosamente');
        this.cargarAsistencias(); 
      },
      (err) => console.error('Error al eliminar asistencia:', err)
    );
  }

  // MÉTODO PARA LIMPIAR EL FORMULARIO DE NUEVA ASISTENCIA
  resetFormulario() {
    this.nuevaAsistencia = {
      id: undefined,
      fecha: '',
      hora: '',
      asistio: false,
      asignatura: {
        id: 1,
        nombre: '',
      },
    };
  }

  // MÉTODO PARA CONFIRMAR LA ASISTENCIA PARA LLAMARSE DESDE UN MODAL LA VENTANA EMERGENTE :)
  confirm() {
    this.agregarAsistencia();
  }

  // MÉTODO PARA CANCELAR LA OPERACIÓN
  Cerrar() {
    this.modalCtrl.dismiss(); // CIERRA EL MODAL
  }

  // EVENTO CUANDO SE CIERRA UN MODAL (ESTOS METODOS RECIBEN DICHOS NOMBRES PORQUE ADAPTÉ EL COMPONENTE DE LA PAG. DE IONIC)
  onWillDismiss(event: any) {
    console.log('Modal cerrado:', event);
  }
}
