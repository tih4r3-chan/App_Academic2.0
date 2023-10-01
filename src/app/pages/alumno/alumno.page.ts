import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-alumno',
  templateUrl: './alumno.page.html',
  styleUrls: ['./alumno.page.scss'],
})
export class AlumnoPage implements OnInit {

  constructor(private alertController: AlertController,
    private navCtrl: NavController,
    public authService : AuthenticationService) { }

  ngOnInit() {
  }

}
