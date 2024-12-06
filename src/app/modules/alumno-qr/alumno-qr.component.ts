import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AsistenciaService } from 'src/app/services/asistencia.service';
import { BarcodeScanner } from '@capacitor-community/barcode-scanner';

@Component({
  selector: 'app-alumno-qr',
  templateUrl: './alumno-qr.component.html',
  styleUrls: ['./alumno-qr.component.scss'],
})
export class AlumnoQrComponent  implements OnInit {

  constructor(private asistenciaService: AsistenciaService, private modalController: ModalController) {}

  ngOnInit() {}

  // METODO PARA ESCANEAR EL QR
  // async escanearQR() {
  //   try {
  //     const permission = await BarcodeScanner.checkPermission({ force: true });
  //     if (!permission.granted) {
  //       alert('Se necesita permiso para usar la cámara.');
  //       return;
  //     }
  //     const result = await BarcodeScanner.startScan();

  //     if (result.hasContent) {
  //       const qrData = JSON.parse(result.content); // AQUÍ SE OBTIENE EL CONTENIDO DEL QR
  //       const asistenciaId = qrData.asistenciaId;
  //       this.vincularAsistencia(asistenciaId); // VINCULAR ALUMNO
  //     }
  //   } catch (err) {
  //     console.error('Error al escanear QR:', err);
  //   }
  // }

  // METODO QUE VINCULA AL ALUMNO CON LA NUEVA ASISTENCIA
  // vincularAsistencia(asistenciaId: string) {
  //   const alumnoId = 'id-del-alumno';
  //   this.asistenciaService.addAsistencia(alumnoId).subscribe(
  //     () => {
  //       console.log('Asistencia registrada exitosamente');
  //     },
  //     (err) => console.error('Error al registrar asistencia:', err)
  //   );
  // }

   // METODO PARA CERRAR EL MODAL
   Cerrar() {
    this.modalController.dismiss();  // Cierra el modal
  }

  // Este método se llama cuando el modal se está cerrando
  onWillDismiss(event: any) {
    console.log('El modal está a punto de cerrarse', event);
    // Aquí puedes agregar cualquier lógica adicional que desees ejecutar antes de cerrar el modal
  }

}
