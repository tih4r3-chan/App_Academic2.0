import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  //se creo un BehaviorSubject llamado resultSource que inicializa con una cadena vacía
  private resultSource = new BehaviorSubject<string>('');
  // sed ecalra currentResult como observable que emite lo valores del anterior
  currentResult = this.resultSource.asObservable();

  //actualiza datos
  setResult(result: any) {
    // se pasa el resultado
    this.resultSource.next(result);
  }
}
