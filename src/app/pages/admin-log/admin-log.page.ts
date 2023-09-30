import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-admin-log',
  templateUrl: './admin-log.page.html',
  styleUrls: ['./admin-log.page.scss'],
})
export class AdminLogPage implements OnInit {

  // crear fromulario
  form = new FormGroup({
    //los inputs
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })

  constructor(private navCtrl: NavController) { }

  ngOnInit() {
  }

  //crear funcion que logea
  async login() {
    this.navCtrl.navigateRoot('/admin');
  }

}
