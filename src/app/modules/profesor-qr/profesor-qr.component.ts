import { Component, OnInit } from '@angular/core';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-profesor-qr',
  templateUrl: './profesor-qr.component.html',
  styleUrls: ['./profesor-qr.component.scss'],
})
export class ProfesorQrComponent implements OnInit {

  userName?: string; // VARIABLE PARA ALMACENAR NOMBRE DEL USUARIO
  userRole: string | null = ''; // VARIABLE PARA ALMACENAR EL ROL DEL USUARIO
  scannedText: string = ''; // ALMACENAR EL TEXTO ESCANEADO

  // INYECTA QRSCANNER Y AUTHSERVICE EN EL CONSTRUCTOR
  constructor(
    private qrScanner: QRScanner,
    private authService: AuthService
  ) {}

  ngOnInit() {
    // Obtener datos del usuario al iniciar el componente
    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getUserRole();
    console.log(localStorage.getItem('usuario'));
  }

  startScan() {
    // Solicitar permisos y activar la cámara
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        // Cámara autorizada, iniciar escaneo
        const scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Texto escaneado:', text);
          this.scannedText = text;

          // Dejar de escanear y ocultar la vista de la cámara
          this.qrScanner.hide();
          scanSub.unsubscribe();
        });

        // Mostrar la cámara
        this.qrScanner.show();
      } else if (status.denied) {
        // Permiso denegado, manejar la situación
        console.error('Permiso de cámara denegado');
      }
    }).catch((e: any) => console.error('Error al preparar el escáner', e));
  }

  stopScan() {
    // Detener el escaneo y destruir la instancia del escáner
    this.qrScanner.hide();
    this.qrScanner.destroy();
  }
}
