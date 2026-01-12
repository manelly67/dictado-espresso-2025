import { Injectable } from '@angular/core';

import { EStiemposverbales } from "./tiemposverbales-es";
import { PTtiemposverbales } from "./tiemposverbales-pt";
import { sujeto } from './sujeto';
import { SUJETOSES } from './SUJETOES';
import { SUJETOSPT } from './SUJETOPT';
import { Conjugacion } from './conjugacion';
import { CONJUGACIONES } from "./conjugaciones-es";
import { CONJUGACIONESPT } from "./conjugaciones-pt";
import { Verbo } from './verbo';
import { VERBOSLISTADO } from './verbos-listado-es';
import { VERBOSLISTADOGRUPO1 } from './verbos-listado-es';
import { VERBOSLISTADOPT } from './verbos-listado-pt';
import { VERBOSLISTADOPTGRUPO1 } from './verbos-listado-pt';


@Injectable({
  providedIn: 'root',
})
export class VerbosRegulares {

  

  captarEStiempos(): string[] {
    const tiempos = EStiemposverbales;
    return tiempos;
  }

  captarPTtiempos(): string[] {
    const tiempos = PTtiemposverbales;
    return tiempos;
  }

  captarSujetoES(): sujeto[] {
    const sujeto = SUJETOSES;
    return sujeto;
  }

  captarSujetoPT(): sujeto[] {
    const sujeto = SUJETOSPT;
    return sujeto;
  }

  captarConjugES(): Conjugacion[] {
    const temp = CONJUGACIONES;
    return temp;
  }

  captarConjugPT(): Conjugacion[] {
    const temp = CONJUGACIONESPT;
    return temp;
  }

  captarVerboES(): Verbo[] {
    const verb = VERBOSLISTADO;
    return verb;
  }

  captarVerboPT(): Verbo[] {
    const verb = VERBOSLISTADOPT;
    return verb;
  }


  captarVerboESgrupo1(): Verbo[] {
    const verb = VERBOSLISTADOGRUPO1;
    return verb;
  }

  captarVerboPTgrupo1(): Verbo[] {
    const verb = VERBOSLISTADOPTGRUPO1;
    return verb;
  }

  captarMaxES(): number {
    const max = VERBOSLISTADO.length;
    return max;
  }

  captarMaxPT(): number {
    const max = VERBOSLISTADOPT.length;
    return max;
  }

  captarMaxESgrupo1(): number {
    const max = VERBOSLISTADOGRUPO1.length;
    return max;
  }

  captarMaxPTgrupo1(): number {
    const max = VERBOSLISTADOPTGRUPO1.length;
    return max;
  }

  captarMaxSujPT(): number {
    const max = SUJETOSPT.length;
    return max;
  }

  captarMaxSujES(): number {
    const max = SUJETOSES.length;
    return max;
  }

  minimo: number = 1;

  generarNumero(arg: number): number {
    /* random number between 1 and the argument */
    const nro = Math.ceil(Math.random() * (arg - this.minimo) + this.minimo);
    return nro;
  }

  generarVerbo<Type>(arg1: number, arg2: Verbo[], arg3: number, arg4: Verbo[], arg5: string): Verbo[] {
    let selected: Verbo[] = [];
    if (arg5 === 'todos') {
      if (arg1 === 0) {
        selected = [];
      } else {
        selected = arg2.filter((obj) => { return (obj.id === arg1) });
      }
    } else {
      if (arg5 === 'grupo1') {
        if (arg3 === 0) {
          selected = [];
        } else {
          selected = arg4.filter((obj) => { return (obj.id === arg3) });
        }
      }
    }
    return selected;
  }

  // convierte en string unicamente el verbo seleccionado y define la terminacion 
  

  definirBase<Type>(arg: string): string {
    const baseVerbo = arg.slice(0, -2);
    return baseVerbo;
  }

  // selecciona un solo sujeto de la base de datos

  generarSujeto<Type>(arg1: number, arg2: sujeto[]): sujeto[] {
    let selected: sujeto[] = [];
    if (arg1 == 0) {
      selected = [];
    } else {
      selected = arg2.filter((obj) => { return (obj.id === arg1) });
    }
    return selected;
  }

   // ajusta el tiempo verbal al contenido que puede ser leido por el array


  ajustaTiempoVerbal<Type>(arg: string): string {
    let tiempoAjustado: string = '';
    if (arg == '') {
      tiempoAjustado = 'presente';
    } else {
      if (arg == 'Futuro' || arg == 'Futuro do Presente') {
        tiempoAjustado = 'futuro';
      } else {
        if (arg == 'Pretérito Perfecto Compuesto' || arg == 'Particípio Passado') {
          tiempoAjustado = 'pretperfectocomp1';
        } else {
          if (arg == 'Pretérito Imperfecto' || arg == 'Pretérito Imperfeito') {
            tiempoAjustado = 'pretimperfecto';
          } else {
            if (arg == 'Pretérito Perfecto' || arg == 'Pretérito Perfeito') {
              tiempoAjustado = 'pretperfecto';
            } else {
              if (arg == 'Presente') {
                tiempoAjustado = 'presente';
              }
            }
          }
        }
      }
    }
    return tiempoAjustado;
  }


  ajustaTiempoVerbalCompuesto<Type>(arg: string): string {
    let tiempoAjustado2: string = '';
    if (arg == 'Pretérito Perfecto Compuesto' || arg == 'Particípio Passado') {
      tiempoAjustado2 = 'pretperfectocomp2';
    } else {
      if (arg == 'Presente' || arg == 'Pretérito Perfecto' || arg == 'Pretérito Perfeito' || arg == 'Pretérito Imperfecto' ||
        arg == 'Pretérito Imperfeito' || arg == 'Futuro' || arg == 'Futuro do Presente') {
        tiempoAjustado2 = 'ninguno';
      }
    }
    return tiempoAjustado2;
  }

  // tomando en cuenta todas las variables define la respuesta

  conjugarVerbo<Type>(arg1: Conjugacion[], arg2: string, arg3: string, arg4: string, arg5: string, arg6: string): string {
    // arg1 es base de dato de conjugaciones - arg2 es terminacion en ar-er-ir - arg3 es base o raiz del verbo
    // arg4 es conjugacion correspondiente al sujeto - arg5 y arg6 es el tiempo verbal seleccionado
    let verboConjugado: string = '';
    if (arg6 == 'ninguno') {
      const conjugacionRenglon = arg1.filter((obj) => { return (obj.tiempoverbal === arg5 && obj.terminacion === arg2) });
      const renglonString = JSON.stringify(conjugacionRenglon);
      const conjugacionEnding = this.leerConjugacion(arg4, renglonString);
      verboConjugado = arg3 + conjugacionEnding;
    } else {
      if (arg6 == 'pretperfectocomp2') {
        const conjugacionRenglon1 = arg1.filter((obj) => { return (obj.tiempoverbal === arg5 && obj.terminacion === arg2) });
        const renglonString1 = JSON.stringify(conjugacionRenglon1);

        const conjugacionRenglon2 = arg1.filter((obj) => { return (obj.tiempoverbal === arg6 && obj.terminacion === arg2) });
        const renglonString2 = JSON.stringify(conjugacionRenglon2);

        const conjugacionEnding1 = this.leerConjugacion(arg4, renglonString1);
        const conjugacionEnding2 = this.leerConjugacion(arg4, renglonString2);

        verboConjugado = conjugacionEnding1 + ' ' + arg3 + conjugacionEnding2;

      }
    }

    return verboConjugado.toUpperCase();
  }

  leerConjugacion<Type>(arg1: string, arg2: string): string {
    // arg2 es el renglon seleccionado convertido en string y arg1 es la conjugacion a buscar
    let texto: string = ""
    const nro1 = Number(arg1.slice(-1));
    const nro2 = nro1 + 1;
    if (nro2 == 7) {
      texto = 'idioma';
    } else {
      texto = 'conjug' + nro2.toString();
    }
    const indice1Conj = arg2.indexOf(arg1);
    const indice2Conj = arg2.indexOf(texto);
    const indice1aConj = indice1Conj + 10;
    const indice2aConj = indice2Conj - 3;
    const textoParaAgregar = arg2.substring(indice1aConj, indice2aConj);

    return textoParaAgregar;
  }


}
