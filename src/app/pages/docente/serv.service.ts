import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Capacitor } from '@capacitor/core';
import { Preferences } from '@capacitor/preferences';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ServService {
  private usuario: any;
  private miColeccionRef: AngularFirestoreDocument<any>;

  constructor(
    private firestore: AngularFirestore
  ) {
    this.obtenerUsuarioAlmacenado();
  }

  private async obtenerUsuarioAlmacenado() {
    try {
      // Obtener el usuario almacenado en Capacitor Preferences
      const usuarioAlmacenado = await Preferences.get({ key: 'usuario' });

      if (usuarioAlmacenado) {
        this.usuario = JSON.parse(usuarioAlmacenado.value);

        // Establecer la referencia al documento específico usando el claseID del usuario
        if (this.usuario.claseID) {
          this.miColeccionRef = this.firestore.doc(`clase/${this.usuario.claseId}`);
        }
      } else {
        console.error('Error: No se encontró información del usuario almacenada.');
      }
    } catch (error) {
      console.error('Error al obtener información del usuario desde Capacitor Preferences:', error);
    }
  }

  obtenerEstado(): Observable<any> {
    // Verificar si la referencia al documento existe antes de intentar obtener el estado
    if (this.miColeccionRef) {
      return this.miColeccionRef.valueChanges();
    } else {
      console.error('Error: Usuario no autenticado o información del usuario no encontrada.');
      return null;
    }
  }

  actualizarEstadoNuevo(): void {
    // Verificar si la referencia al documento existe antes de intentar actualizar el estado
    if (this.miColeccionRef) {
      // Actualizar el campo 'estado' a true
      this.miColeccionRef.update({ estado: true })
        .then(() => console.log('Estado actualizado con éxito a true.'))
        .catch(error => console.error('Error al actualizar el estado:', error));
    } else {
      console.error('Error: Usuario no autenticado o información del usuario no encontrada.');
    }
  }
}
