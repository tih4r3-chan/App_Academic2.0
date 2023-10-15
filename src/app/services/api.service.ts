import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  //url de la api
  urlApi ='https://firestore.googleapis.com/v1/projects/AIzaSyCXa-yIkcrkRSASC-HoxtHaITXpLe43SGI/databases/(default)/documents/usuarios';

  constructor(
    private http: HttpClient
  ) { }

  
}
