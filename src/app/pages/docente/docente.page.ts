import { Component, OnInit } from '@angular/core';
import { AuthServiceService } from 'src/app/services/capacitor.service';
import { AuthenticationService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  constructor(
    public authService: AuthenticationService,
    private storage: AuthServiceService
  ) { }

  ngOnInit() {
  }

}
