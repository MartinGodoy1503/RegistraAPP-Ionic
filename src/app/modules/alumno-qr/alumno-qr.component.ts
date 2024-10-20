import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-alumno-qr',
  templateUrl: './alumno-qr.component.html',
  styleUrls: ['./alumno-qr.component.scss'],
})
export class AlumnoQrComponent  implements OnInit {

  constructor(private modalCtrl: ModalController) { }

  ngOnInit() {}

  // MÉTODO PARA CANCELAR LA OPERACIÓN
  Cerrar() {
    this.modalCtrl.dismiss(); // Cierra el modal
  }

  // EVENTO CUANDO SE CIERRA UN MODAL (ESTOS METODOS RECIBEN DICHOS NOMBRES PORQUE ADAPTÉ EL COMPONENTE DE LA PAG. DE IONIC)
  onWillDismiss(event: any) {
    console.log('Modal cerrado:', event);
  }

}
