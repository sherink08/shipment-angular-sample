import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class DataService {
  public dataSubject = new Subject<any>();
  public dataState = this.dataSubject.asObservable();

  constructor() { }

  recieve(data: any) {
    this.dataSubject.next(data);
  }
}
