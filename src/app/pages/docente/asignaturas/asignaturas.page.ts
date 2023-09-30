import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-asignaturas',
  templateUrl: './asignaturas.page.html',
  styleUrls: ['./asignaturas.page.scss'],
})
export class AsignaturasPage implements OnInit {
  //crear user tipó any y guardarlo en un array
  asignatura: any =[];

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.getUser().subscribe(res=>{
      //para ver si funciona
      console.log(res)
      //guardar la respuesta en una variable, en este caso user
      this.asignatura = res;
    })
  }

  //crear una funcion para traer el json
  getUser() {
    return this.http
    .get("assets/json/asignaturas.json")
    //hacer uso del map, mapear json, entrar directamente a los datos
    .pipe(
      map((res:any)=>{
        return res.asignaturas;
      })
    )
  }

}
