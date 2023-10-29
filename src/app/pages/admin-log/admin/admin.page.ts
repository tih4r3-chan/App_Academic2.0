import { Component, OnInit } from '@angular/core';
import { AuthenticationService } from 'src/app/services/firestore.service';
import { ApiService } from 'src/app/services/api.service';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.page.html',
  styleUrls: ['./admin.page.scss'],
})
export class AdminPage implements OnInit {
  //inicializando
  userList: any[];

  constructor(
    public authService : AuthenticationService,
    private _userServce: ApiService
  ) {
  }

  ngOnInit() {
    this.listar();
  }

  async listar(){
    //obtener lista de user de la api
    this._userServce.getUsers().subscribe((data) => {
      this.userList = data;
    })
  }

}
