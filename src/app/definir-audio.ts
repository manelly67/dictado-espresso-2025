import { Injectable } from '@angular/core';

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


}
