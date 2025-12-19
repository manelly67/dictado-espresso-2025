import { Injectable } from '@angular/core';
import { Letrasdeaudio } from './letrasdeaudio';
import { Letrasdeaudiopt } from './letrasdeaudiopt';
import { LETRASDEAUDIOS } from './LETRASDEAUDIOS';
import { LETRASDEAUDIOSPT } from './LETRASDEAUDIOSPT';

@Injectable({
  providedIn: 'root',
})
export class DefinirAudio {
  constructor() { }

  nivel?: string;
  archivo?: string;
  archivoAudio: string = '';

  definirAudio<type>(arg1: string | undefined, arg2: number): string {       //para definir el nombre de los audios - solo hay archivos mp3 
    if (arg1 == '' || arg1 == undefined) {
      this.archivoAudio = '';
    } else {
      this.archivo = arg2.toString();
      this.archivoAudio = 'assets/sounds/' + arg1 + '/' + this.archivo + '.mp3';
    }
    return this.archivoAudio;
  }

  getLyrics<type>(arg1: string, arg2: string, arg3: number): (Letrasdeaudio | Letrasdeaudiopt) {
    let arrLyrics: Letrasdeaudio[] | Letrasdeaudiopt[] = [];
       
    if (arg1 === 'es') {
      arrLyrics = this.captarLetras();
    }else{
      if (arg1 === "pt") {
        arrLyrics = this.captarLetraspt();
      }
    } 
    
    const [lyrics] = arrLyrics.filter((e) => e.nivel === arg2 && e.nro === arg3);
    return lyrics;
  }

  captarLetras(): Letrasdeaudio[] {
    const letrasdeaudios = LETRASDEAUDIOS;
    return letrasdeaudios;
  }

  captarLetraspt(): Letrasdeaudiopt[] {
    const letrasdeaudiospt = LETRASDEAUDIOSPT;
    return letrasdeaudiospt;
  }

}
