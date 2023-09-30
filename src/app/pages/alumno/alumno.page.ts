import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

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
