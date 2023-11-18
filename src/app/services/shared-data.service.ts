import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SharedDataService {
  private resultSource = new BehaviorSubject<string>('');
  currentResult = this.resultSource.asObservable();

  setResult(result: string) {
    this.resultSource.next(result);
  }
}
