import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {

  constructor(
    public authService : AuthenticationService
  ) { }

  ngOnInit() {
  }

}
