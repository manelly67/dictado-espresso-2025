import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Location } from '@angular/common';

import { TopInPage } from '../top-in-page/top-in-page';


@Component({
  selector: 'app-verb-base',
  imports: [RouterLink, TopInPage],
  templateUrl: './verb-base.html',
  styleUrl: './verb-base.css',
})

export class VerbBase implements OnInit {

  es?: boolean;
  pt?: boolean;
  mainTitle?: string;
  homeRoute?: string;
  texto1: string = '';
  texto2: string = '';

  constructor(
    public route: ActivatedRoute,
    private location: Location,
  ) { }

  ngOnInit() {
    const lang = this.route.snapshot.paramMap.get('lang');
    if (lang) {
      this.setTopByLang(lang);
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
    this.texto1 = 'Esta é a tua resposta';
    this.texto2 = 'Não escreveu dados para comparação';
  }

  esFn() {
    this.texto1 = 'Esta es tu respuesta';
    this.texto2 = 'No has escrito datos para comparar';
  }

  goBack(){
    this.location.back();
  }


}
