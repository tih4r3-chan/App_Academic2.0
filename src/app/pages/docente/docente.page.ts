import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/firestore.service'

@Component({
  selector: 'app-docente',
  templateUrl: './docente.page.html',
  styleUrls: ['./docente.page.scss'],
})
export class DocentePage implements OnInit {

  constructor(
    public authService: AuthenticationService
  ) { }

  ngOnInit() {
  }
}
