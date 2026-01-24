import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Location } from '@angular/common';

import { TopInPage } from '../top-in-page/top-in-page';
import { Aside } from '../aside/aside';
import { Footer } from '../footer/footer';
import { Audio } from '../audio/audio';
import { Escribe } from '../escribe/escribe';
import { Comparison } from '../comparison/comparison';
import { Categoria } from '../categoria';
import { MsgCateg } from '../msg-categ';
import { DefinirAudio } from '../definir-audio';
import { Letrasdeaudio } from '../letrasdeaudio';
import { Letrasdeaudiopt } from '../letrasdeaudiopt';
import { Guardartexto } from '../guardartexto';
import { EscribeS } from '../escribe';
import { Clear } from '../clear';
import { CompararS } from '../comparar';
import { Point } from '../point';
import { MyScore } from '../my-score';

@Component({
  selector: 'app-dict-base',
  imports: [TopInPage, Aside, Footer, Audio, Escribe, Comparison, RouterLink],
  templateUrl: './dict-base.html',
  styleUrl: './dict-base.css',
})
export class DictBase implements OnInit {

  es?: boolean;
  pt?: boolean;
  divfortype?: boolean;
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
  amountsAudios:number=0;
  showNext?:boolean;
  /*text in html */
  texto1: string = '';
  texto2: string = '';
  texto3: { a: string, b: string } = { a: "", b: "" };
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
    public myScore: MyScore,
  ) { }

  categoria = this.msgCateg.categoria;
  categorias = this.msgCateg.captarCategorias();

  ngOnInit() {
    const getNivel = this.route.snapshot.paramMap.get('nivel');
    const lang = this.route.snapshot.paramMap.get('lang');
    const getNro = this.route.snapshot.paramMap.get('nro');
    const categGet = this.route.snapshot.paramMap.get('categ');
    this.divfortype = true;
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
      this.amountsAudios = this.definirAudio.getAmountAudios(this.nivel,lang);
      this.showNext = this.defineNextBtn(this.amountsAudios,this.nro);
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
    this.texto1 = 'Esta é a tua resposta';
    this.texto2 = 'Não escreveu dados para comparação';
  }

  esFn() {
    this.texto1 = 'Esta es tu respuesta';
    this.texto2 = 'No has escrito datos para comparar';
  }

  defineNextBtn(arg1:number,arg2:number):boolean{
    return arg2<arg1 ? true : false;
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
      return this.texto1;
    } else {
      if (this.guardartexto.textodefinitivo == '') {
        return this.texto2;
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

  toogleSection() {
    const newSection = this.divfortype ? false : true;
    this.divfortype = newSection;
  }

  /* functions necessary for reload the page by new params */
  goBack(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.location.back();
    });
  }

  /*path: 'dictado/:nivel/:nro/:lang', */
  navigateToNext() {
    if (this.nro) {
      const nextNro = this.nro + 1;
      if (this.es) {
        const selectAudioRoute = `/dictado/${this.categ}/${this.nivel}/${nextNro}/es`;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([selectAudioRoute]);
        });

      }
      if (this.pt) {
        const selectAudioRoute = `/dictado/${this.categ}/${this.nivel}/${nextNro}/pt`;
        this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
          this.router.navigate([selectAudioRoute]);
        });
      }
    }
  }

  // variables para el score-board
  today: Date = new Date();
  
  setPoint() {
    let lg: string = this.es ? 'es' : 'pt';
    let categoryScore: string = this.filterObj? this.filterObj.modo : '';
    let subcateg: string = this.filterObj? this.filterObj.nivel : '';   
    const point: Point = {
      date: this.today.toISOString(),
      language: lg,
      category: categoryScore,
      subcategory: subcateg,
      percent: this.percentAciertos,
    };
    this.myScore.data.push(point);
    this.myScore.sendToLocalStorage();
  }

}