import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Clear {

  constructor() { }

  
  clearArray<Type>(arg: Array<Type>): Array<Type> {
    arg = [];
    return arg;
  }
  clear<Type>(arg: string): string {
    arg = '';
    return arg;
  }
  clearNro<Type>(arg: number): number {
    arg = 0;
    return arg;
  }

}
