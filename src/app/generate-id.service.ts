import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GenerateIDService {

  constructor() { }

  partial() {
    return Math.floor((1 + Math.random()) * 0x10000).toString(36);
  }

  generate() {
    let id = '';
    for(let i=0;i<6;i++){
      id += this.partial();
    }
    return id;
  }
}
