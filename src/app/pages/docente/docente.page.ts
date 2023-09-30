import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  constructor(private alertController: AlertController,
    private navCtrl: NavController) { }

  ngOnInit() {
  }

  async cerrarSesion(){
    this.navCtrl.navigateRoot('/home');
    // alerta para que te dice que sdebes llenar datos validos
    const alert = await this.alertController.create({
      header: 'Alerta',
      message: 'Se cerró sesión',
      buttons: ['Aceptar']
    })
    await alert.present()
    return;
  }

}
