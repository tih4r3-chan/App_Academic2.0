import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})
export class ClaseUpdateService {
  urlApiC = 'https://firestore.googleapis.com/v1/projects/appacademic-bb066/databases/(default)/documents/clase';

  constructor(private http: HttpClient) { }

  // Método para actualizar el estado de la clase por una hora
  actualizarEstadoPorUnaHora(idClase: string): Observable<any> {
    // Lógica para actualizar el estado por una hora
    const horaLimite = new Date();
    horaLimite.setHours(horaLimite.getHours() + 1); // Suma una hora

    // Llama a Firestore para actualizar el estado de la clase
    const updateData = {
      estado: true, // Actualiza el estado a true
    };

    return this.http.patch<any>(`${this.urlApiC}/${idClase}`, updateData).pipe(
      map(response => {
        // Maneja la respuesta según tus necesidades
        console.log('Estado actualizado con éxito:', response);

        // Configura un temporizador para restaurar el estado después de una hora
        setTimeout(() => {
          this.restaurarEstadoOriginal(idClase);
        }, horaLimite.getTime() - Date.now());

        return response;
      })
    );
  }

  // Método para restaurar el estado original después de una hora
  private restaurarEstadoOriginal(idClase: string): void {
    const updateData = {
      estado: false, // Restaura el estado a false
    };

    this.http.patch<any>(`${this.urlApiC}/${idClase}`, updateData).subscribe(response => {
      // Maneja la respuesta según tus necesidades
      console.log('Estado restaurado con éxito:', response);
    });
  }
}
