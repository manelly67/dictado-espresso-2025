import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Categoria } from '../categoria';
import { MsgCateg } from '../msg-categ';
import { TopInPage } from '../top-in-page/top-in-page';
import { Audio } from '../audio/audio';
import { DefinirAudio } from '../definir-audio';
import { Letrasdeaudio } from '../letrasdeaudio';
import { Letrasdeaudiopt } from '../letrasdeaudiopt';

@Component({
  selector: 'app-dict-base',
  imports: [TopInPage, Audio, RouterLink],
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
  /*text in html */
  texto1: string = '';
  texto2: string = '';
  texto3: string = '';
  texto4: string = '';
  texto5: string = '';


  constructor(
    public route: ActivatedRoute,
    public router: Router,
    private location: Location,
    public msgCateg: MsgCateg,
    private definirAudio: DefinirAudio,
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
    }
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


}


