import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class CompararS {

  // crea un array separando cada palabra de la frase y 
  // descarta los espacios vacios
  crearArray<Type>(arg: string): string[] {
    let array = [];
    array = arg.split(' ');
    array = array.filter(word => word.length > 0);
    return array;
  }

  comparandoArrays<Type>(arg1: string[], arg2: string[]): string[] {
    let nuevoArray = [];
    let comparando = "";
    if (arg2[0] == undefined) {
      //si no se ha escrito texto no guarda nada en el nuevoArray (mensaje emitido)
      nuevoArray[0] = '';
    } else {
      for (let i = 0; i < arg1.length; i++) {
        if (arg2[i] === undefined) {
          nuevoArray[i] = arg1[i] + ' (?)';
        } else {
          comparando = arg2[i];
          comparando = comparando.trimStart();
          comparando = comparando.trimEnd();
          if (arg1[i] === comparando) {
            nuevoArray[i] = arg1[i] + '';
            comparando = '';
          } else {
            nuevoArray[i] = arg1[i] + ' (' + arg2[i] + ')';
            // crea un nuevo array comparando cada item segun parametros
          }
        }
      }
    }
    return nuevoArray;
  }

  aciertos<Type>(arg1: string[]): number {
    let good = 0;
    let fails = 0;
    if (arg1[0] == '') {
      // si no ha escrito palabras el array está vacio y cuenta 0 aciertos (mensaje emitido)
      good = 0;
    } else {
      for (let i = 0; i < arg1.length; i++) {
        if (arg1[i].includes('(')) {
          fails = fails + 1;
          // cuenta los desaciertos                         
        } else { }
      }
      // por diferencia obtiene los aciertos
      good = arg1.length - fails;
    }
    return good;
  }

  porcentaje<Type>(arg1: string[], arg2: number): number {
    let percentAciertos = 0;
    if (arg1[0] == '') {
      percentAciertos = 0;                                             // si no ha escrito palabras el array está vacio y cuenta 0 aciertos (mensaje emitido)
    } else {
      percentAciertos = (arg2 / arg1.length) * 100;
    }
    return percentAciertos;
  }


  indicador<Type>(arg1: string[], arg2: number): string {
    let mostrarIndicador = '';
    if (arg1[0] === '') {
      mostrarIndicador = '';                                             // si no ha escrito palabras el array está vacio y no emite indicador (mensaje emitido)
    } else {
      if (arg2 === 100) {
        mostrarIndicador = '\u2713';
      } else {
        mostrarIndicador = 'X';
      }
    }
    return mostrarIndicador;
  }

}
