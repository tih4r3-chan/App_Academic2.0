import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { NavController } from '@ionic/angular';
import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-log-in',
  templateUrl: './log-in.page.html',
  styleUrls: ['./log-in.page.scss'],
})
export class LogInPage implements OnInit {
  // crear fromulario
  form = new FormGroup({
    //los inputs
    email: new FormControl('',[Validators.required, Validators.email]),
    password: new FormControl('',[Validators.required]),
  })

  constructor(
    private auth: AngularFireAuth,
    private navCtrl: NavController,
    private firestore: AngularFirestore
  ) {}

  ngOnInit() {
  }


  //crear funcion que logea
  async login() {
    console.log('aaaaa')
  }
}
