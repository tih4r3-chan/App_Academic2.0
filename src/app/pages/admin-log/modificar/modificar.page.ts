import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.page.html',
  styleUrls: ['./modificar.page.scss'],
})
export class ModificarPage implements OnInit {

  constructor(
    public authService : AuthenticationService
  ) { }

  ngOnInit() {
  }

}
