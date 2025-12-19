import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Location } from '@angular/common';
import { Categoria } from '../categoria';
import { MsgCateg } from '../msg-categ';
import { TopInPage } from '../top-in-page/top-in-page';
import { Audio } from '../audio/audio';
import { DefinirAudio } from '../definir-audio';

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
    if (getNivel && getNro) {
      this.nivel = getNivel;
      this.nro = Number(getNro);
      this.pathToAudio = this.definirAudio.definirAudio(this.nivel, this.nro);
    }
  }

  setTopByLang(arg: string) {
    if (arg === "es") {
      this.es = true;
      this.pt = false;
      this.mainTitle = "Exercises to practice the Spanish language";
      this.homeRoute = "/";
    }
    if (arg === "pt") {
      this.es = false;
      this.pt = true;
      this.mainTitle = "Exercises to practice the Portuguese language";
      this.homeRoute = "/pt";
    }
  }

  goBack(): void {
    this.location.back();
  }


}


