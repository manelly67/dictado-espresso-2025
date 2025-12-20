import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { TecladoEs } from '../teclado-es/teclado-es';
import { TecladoPt } from '../teclado-pt/teclado-pt';
import { EscribeS } from '../escribe';
import { Clear } from '../clear';


@Component({
  selector: 'app-escribe',
  imports: [TecladoEs, TecladoPt],
  templateUrl: './escribe.html',
  styleUrl: './escribe.css',
})
export class Escribe implements OnInit {
  
  @Output() guardartexto = new EventEmitter();
  @Input() es?: boolean;
  @Input() pt?: boolean;
  @Input() nivel?: string;
  forclass: string = "";
  texto1:string="";
  letra: string = "";
  arrayprov: string = '';
  arraytexto: string = "";
  array: string[] = [];

  /* el texto se va incorporando en el array desde el teclado y las teclas de caracteres especiales   */


  constructor(/* 
    public compararService: CompararService,	 */
    public escribeService: EscribeS,
    public clear: Clear,
  ) { }

  ngOnInit(): void {
    if (this.nivel) {
      this.forclass = this.nivel.slice(0, 2);
      this.definirTextos();
    }
  }

  definirTextos(){
    if (this.es == true){
      this.texto1 = 'Escribe tu respuesta y [ENTER] ';
     /*  this.comparar.label2 = 'Esta es tu respuesta:'; */
      }else{
      if (this.pt == true){
      this.texto1 = 'Escreva a sua resposta e [ENTER] ';
     /*  this.comparar.label2 = 'Esta é a tua resposta:'; */
      }}
  }

  onKey2(event: any) { // without type info
    this.arraytexto = event.target.value;
  }

  onNotifyA1() {
    this.letra = 'à'; this.definir();
  }
  onNotifyA2() {
    this.letra = 'á'; this.definir();
  }
  onNotifyA3() {
    this.letra = 'â'; this.definir();
  }
  onNotifyA4() {
    this.letra = 'ã'; this.definir();
  }
  onNotifyC() {
    this.letra = 'ç'; this.definir();
  }
  onNotifyE1() {
    this.letra = 'é'; this.definir();
  }
  onNotifyE2() {
    this.letra = 'ê'; this.definir();
  }
  onNotifyI() {
    this.letra = 'í'; this.definir();
  }
  onNotifyO1() {
    this.letra = 'ó'; this.definir();
  }
  onNotifyO2() {
    this.letra = 'ô'; this.definir();
  }
  onNotifyO3() {
    this.letra = 'õ'; this.definir();
  }
  onNotifyU1() {
    this.letra = 'ú'; this.definir();
  }
  onNotifyU2() {
    this.letra = 'ü'; this.definir();
  }
  onNotifyN() {
    this.letra = 'ñ'; this.definir();
  }
  onNotifyInterr() {
    this.letra = '¿'; this.definir();
  }
  onNotifyExclam() {
    this.letra = '¡'; this.definir();
  }

  // incorpora el caracter especial al array texto
  definir() {
    this.escribeService.array.push(this.letra);
    this.array = this.escribeService.array;
    this.arraytexto = this.array.toString();
    this.arraytexto = this.arraytexto.replace(/(,)/gm, "");       // extrae del array convertido a texto solo las comas
    this.escribeService.textodefinitivo = this.arraytexto;
  }

  // cuando se hace blur y click en un caracter especial
  actualizar() {
    this.arrayprov = this.arraytexto;
    this.escribeService.array = [];
    this.escribeService.array.push(this.arrayprov);
    this.array = this.escribeService.array;
    this.arraytexto = this.array.toString();
    this.arraytexto = this.arraytexto.replace(/(,)/gm, "");
    this.escribeService.textodefinitivo = this.arraytexto;
  }

  // cuando se ingresa el texto con enter 
  actualizar2() {
    this.escribeService.array.push(this.arraytexto);
    this.array = this.escribeService.array.slice(-1);
    this.arraytexto = this.array.toString();
    this.arraytexto = this.arraytexto.replace(/(,)/gm, "");        // extrae del array convertido a texto solo las comas
    this.escribeService.textodefinitivo = this.arraytexto;
  }


  // borra el texto ingresado cuando ya se ha enviado la respuesta - submit button
  borrar() {
    this.array = this.clear.clearArray(this.array);
    this.arraytexto = this.clear.clear(this.arraytexto);
    this.escribeService.textodefinitivo = this.clear.clear(this.escribeService.textodefinitivo);
  };



  /* 	this.array = this.clearService.clearArray(this.array);
    this.arraytexto = this.clearService.clear(this.arraytexto);
    this.tecladoService.textodefinitivo = this.clearService.clear(this.tecladoService.textodefinitivo);
    this.compararService.nuevoArray = this.clearService.clearArray(this.compararService.nuevoArray);
    this.compararService.contar = this.clearService.clearNro(this.compararService.contar);
    this.compararService.percentAciertos = this.clearService.clearNro(this.compararService.percentAciertos);
    this.compararService.mostrarIndicador = this.clearService.clear(this.compararService.mostrarIndicador); */



}
