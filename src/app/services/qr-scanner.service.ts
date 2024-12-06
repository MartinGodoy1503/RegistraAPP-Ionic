import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import QrScanner from 'qr-scanner';

@Injectable({
  providedIn: 'root',
})
export class QRScannerService {
  private currentStream: MediaStream | null = null; // Mantener referencia al stream activo

  startScanning(videoElement: HTMLVideoElement): Observable<string> {
    return new Observable((observer) => {
      navigator.mediaDevices
        .getUserMedia({ video: { facingMode: 'environment' } })
        .then((stream) => {
          this.currentStream = stream; // Guardar el stream
          videoElement.srcObject = stream;

          videoElement.addEventListener('loadedmetadata', () => {
            videoElement.play();

            const scanLoop = async () => {
              try {
                const result = await QrScanner.scanImage(videoElement, { returnDetailedScanResult: true });
                if (result) {
                  observer.next(result.data); // Emitir el resultado escaneado
                  this.stopScanning(); // Detener la cámara si el escaneo fue exitoso
                } else {
                  requestAnimationFrame(scanLoop); // Continuar escaneando
                }
              } catch (error) {
                console.error('Error al escanear QR:', error);
                observer.error(error); // Notificar error al observable
                requestAnimationFrame(scanLoop); // Seguir intentando
              }
            };

            scanLoop();
          });
        })
        .catch((error) => {
          console.error('Error al inicializar la cámara:', error);
          observer.error(error);
        });
    });
  }

  stopScanning() {
    if (this.currentStream) {
      this.currentStream.getTracks().forEach((track) => track.stop());
      this.currentStream = null;
    }
  }
}
