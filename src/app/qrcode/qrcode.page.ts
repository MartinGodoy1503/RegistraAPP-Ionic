import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { QRScanner, QRScannerStatus } from '@ionic-native/qr-scanner/ngx';
import { AuthService } from '../services/auth.service';


@Component({
  selector: 'app-qrcode',
  templateUrl: './qrcode.page.html',
  styleUrls: ['./qrcode.page.scss'],
})
export class QRcodePage implements OnInit {

  userName?: string; // VARIABLE PARA ALMACENAR NOMBRE DEL USUARIO 
  userRole: string | null = ''; // VARIABLE PARA ALMACENAR EL ROL DEL USUARIO
  scannedText: string = ''; // ALMACENAR EL TEXTO ESCANEADO

  constructor(private qrScanner: QRScanner, private authService: AuthService, private router: Router) {}

  ngOnInit() {

    this.userName = this.authService.getUserName();
    this.userRole = this.authService.getUserRole();
    console.log(localStorage.getItem('usuario'));

  }

  startScan() {
    // SOLICITAR PERMISOS Y ACTIVAR LA CÁMARA
    this.qrScanner.prepare().then((status: QRScannerStatus) => {
      if (status.authorized) {
        // CÁMARA AUTORIZADA, INICIAR ESCANEO
        const scanSub = this.qrScanner.scan().subscribe((text: string) => {
          console.log('Texto escaneado:', text);
          this.scannedText = text;

          // DEJAR DE ESCANEAR Y OCULTAR LA VISTA DE LA CÁMARA
          this.qrScanner.hide();
          scanSub.unsubscribe();
        });

        // Mostrar la cámara
        this.qrScanner.show();
      } else if (status.denied) {
        // PERMISO DENEGADO, MANEJAR LA SITUACIÓN
        console.error('Permiso de cámara denegado');
      }

    }).catch((e: any) => console.error('Error al preparar el escáner', e));
  }

  stopScan() {
    this.qrScanner.hide(); 
    this.qrScanner.destroy();
  }

  goToPage(page: string) {
    this.router.navigate([`/${page}`]).then(
      success => {
        if (!success) {
          console.error('Error al navegar a:', page);
        }
      },
      error => console.error('Error en la navegación:', error)
    );
  }
  
}

