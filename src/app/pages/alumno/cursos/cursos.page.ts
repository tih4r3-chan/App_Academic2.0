import { Component, OnInit } from '@angular/core';
//import del modulo http
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-cursos',
  templateUrl: './cursos.page.html',
  styleUrls: ['./cursos.page.scss'],
})
export class CursosPage implements OnInit {
  //crear user tipó any y guardarlo en un array
  curso: any =[];

  constructor(private http: HttpClient, private router: Router) { }

  ngOnInit() {
    this.getUser().subscribe(res=>{
      //para ver si funciona
      console.log(res)
      //guardar la respuesta en una variable, en este caso user
      this.curso = res;
    })
  }

  //crear una funcion para traer el json
  getUser() {
    return this.http
    .get("assets/json/cusos.json")
    //hacer uso del map, mapear json, entrar directamente a los datos
    .pipe(
      map((res:any)=>{
        return res.cursos;
      })
    )
  }
}