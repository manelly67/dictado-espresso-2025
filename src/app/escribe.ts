import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EscribeS {

arraytexto:string = '';
 //el texto se va incorporando en el array 
 // desde el teclado y las teclas de caracteres especiales
array:string[] = [];                
n:number = this.array.length;

// este texto será luego utilizado a traves 
// de otro componente para una posterior comparacion
textodefinitivo:string = '';         
  
}
