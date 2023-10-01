import { Component, OnInit } from '@angular/core';
import { AlertController, NavController } from '@ionic/angular';
import { AuthenticationService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  constructor(private alertController: AlertController,
    private navCtrl: NavController,
    public authService : AuthenticationService) { }

  ngOnInit() {
  }

}
