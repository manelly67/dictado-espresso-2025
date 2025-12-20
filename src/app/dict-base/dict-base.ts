import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Location } from '@angular/common';

import { TopInPage } from '../top-in-page/top-in-page';
import { Audio } from '../audio/audio';
import { Escribe } from '../escribe/escribe';

import { Categoria } from '../categoria';
import { MsgCateg } from '../msg-categ';
import { DefinirAudio } from '../definir-audio';
import { Letrasdeaudio } from '../letrasdeaudio';
import { Letrasdeaudiopt } from '../letrasdeaudiopt';
import { Guardartexto } from '../guardartexto';
import { EscribeS } from '../escribe';
import { Clear } from '../clear';
import { CompararS } from '../comparar';

@Component({
  selector: 'app-dict-base',
  imports: [TopInPage, Audio, Escribe, RouterLink],
  templateUrl: './dict-base.html',
  styleUrl: './dict-base.css',
})
export class DictBase implements OnInit {

  es?: boolean;
  pt?: boolean;
  categ?: number;
  filterObj?: Categoria;
  mainTitle?: string;
  homeRoute?: string;
  nivel?: string;
  nro?: number;
  pathToAudio?: string;
  audiolyrics?: Letrasdeaudio | Letrasdeaudiopt;
  respuesta: string = "";
  lyricsToMatch?: string;
  /*text in html */
  texto1: string = '';
  texto2: string = '';
  texto3: string = '';
  texto4: string = '';
  texto5: string = '';
  mensajedealerta: string = "";

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private location: Location,
    public msgCateg: MsgCateg,
    private definirAudio: DefinirAudio,
    public guardartexto: Guardartexto,
    public escribeService: EscribeS,
    public clear: Clear,
    public compararS: CompararS,
  ) { }

  categoria = this.msgCateg.categoria;
  categorias = this.msgCateg.captarCategorias();

  ngOnInit() {
    const getNivel = this.route.snapshot.paramMap.get('nivel');
    const lang = this.route.snapshot.paramMap.get('lang');
    const getNro = this.route.snapshot.paramMap.get('nro');
    const categGet = this.route.snapshot.paramMap.get('categ');
    if (categGet) {
      this.categ = Number(categGet);
      [this.filterObj] = this.categorias.filter((e) => e.id === this.categ);
    }
    if (lang) {
      this.setTopByLang(lang);
    }
    if (getNivel && getNro && lang) {
      this.nivel = getNivel;
      this.nro = Number(getNro);
      this.pathToAudio = this.definirAudio.definirAudio(this.nivel, this.nro);
      this.audiolyrics = this.definirAudio.getLyrics(lang, this.nivel, this.nro);
      this.lyricsToMatch = this.guardarSeleccion(this.audiolyrics.frase);
    }
    //borra los textos anteriores - ingresados por el usuario- para comenzar un nuevo ingreso de texto
    this.respuesta = this.clear.clear(this.respuesta);
    this.guardartexto.textodefinitivo = this.clear.clear(this.guardartexto.textodefinitivo);
  }

  setTopByLang(arg: string) {
    if (arg === "es") {
      this.es = true;
      this.pt = false;
      this.mainTitle = "Exercises to practice the Spanish language";
      this.homeRoute = "/";
      this.esFn();
    }
    if (arg === "pt") {
      this.es = false;
      this.pt = true;
      this.mainTitle = "Exercises to practice the Portuguese language";
      this.homeRoute = "/pt";
      this.ptFn();
    }
  }



  // para definir el idioma de las instrucciones 
  ptFn() {
    this.texto1 = 'Gerar';
    this.texto2 = 'Ocultar resposta';
    this.texto3 = 'Mostrar resposta';
    this.texto4 = 'Não foi gerado áudio';
    this.texto5 = 'Não escreveu dados para comparação';
  }

  esFn() {
    this.texto1 = 'Generar';
    this.texto2 = 'Ocultar respuesta';
    this.texto3 = 'Mostrar respuesta';
    this.texto4 = 'No has generado un audio';
    this.texto5 = 'No has escrito datos para comparar';
  }

  goBack(): void {
    this.location.back();
  }

  guardarSeleccion(frase: string): string | undefined {
    // prepare the lyrics for match - remove ? and turn all to uppercase
    if (frase) {
      frase = this.guardartexto.depurar(frase);           // extrae de la palabra seleccionada los signos ?¿ y ,
      frase = this.guardartexto.guardarSeleccion(frase);  // guarda la audiolyrics.frase(convertida en mayuscula) para COMPARAR
      return frase;
    } else {
      return undefined;
    }
  }

  onGuardartexto(): string {
    this.respuesta = this.guardartexto.depurar(this.escribeService.textodefinitivo);    //  extrae del texto ingresado los caracteres especiales
    this.escribeService.array = this.clear.clearArray(this.escribeService.array);
    this.escribeService.arraytexto = this.clear.clear(this.escribeService.arraytexto);
    this.respuesta = this.guardartexto.guardarDefinitivo(this.respuesta);   // guarda el texto ingresado(convertido en mayuscula) para COMPARAR
    return this.respuesta;
  }

  mensaje(): string {
    if (this.guardartexto.palabraseleccionada == '') {
      return this.texto4;
    } else {
      if (this.guardartexto.textodefinitivo == '') {
        return this.texto5;
      } else {
        return "";
      }
    }
  }

  arrayPalabra: string[] = [];
  arrayRespuesta: string[] = [];
  nuevoArray: string[] = [];
  aciertos: number = 0;
  percentAciertos: number = 0;
  mostrarIndicador: string = '';
  comparar() {
    this.mensajedealerta = this.mensaje();
    do {
      if (this.lyricsToMatch) {
        this.arrayPalabra = this.compararS.crearArray(this.lyricsToMatch);
      }
      this.arrayRespuesta = this.compararS.crearArray(this.respuesta);
      this.nuevoArray = this.compararS.comparandoArrays(this.arrayPalabra, this.arrayRespuesta);
      this.aciertos = this.compararS.aciertos(this.nuevoArray);
      this.percentAciertos = this.compararS.porcentaje(this.nuevoArray, this.aciertos);
      this.mostrarIndicador = this.compararS.indicador(this.nuevoArray, this.percentAciertos);
      return;
    } while (this.mensajedealerta == '');

  }

}


