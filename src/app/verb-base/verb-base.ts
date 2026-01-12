import { Component, OnInit } from '@angular/core';
import { NgClass } from '@angular/common';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Location } from '@angular/common';
import { VerbosRegulares } from '../verbos-regulares';
import { Verbo } from '../verbo';
import { sujeto } from '../sujeto';
import { Conjugacion } from '../conjugacion';
import { TopInPage } from '../top-in-page/top-in-page';
import { Guardartexto } from '../guardartexto';
import { Clear } from '../clear';
import { EscribeS } from '../escribe';
import { CompararS } from '../comparar';
import { Escribe } from '../escribe/escribe';
import { Comparison } from '../comparison/comparison';


@Component({
  selector: 'app-verb-base',
  imports: [RouterLink, TopInPage, Escribe, Comparison],
  templateUrl: './verb-base.html',
  styleUrl: './verb-base.css',
})

export class VerbBase implements OnInit {

  es?: boolean;
  pt?: boolean;
  nivel: string = 'pr';
  
  mainTitle?: string;
  homeRoute?: string;

  divfortype?: boolean;
  tenseDiv?:boolean;
  activarBoton?: boolean;

  tiemposverbales: string[] = [];
  verboslistado: Verbo[] = [];
  verbosgrupo1: Verbo[] = [];
  maximo: number = 0;
  maximogrupo1: number = 0;
  sujeto: sujeto[] = [];
  sujetoMax: number = 0;
  conjugacion: Conjugacion[] = [];
  tipo: string = 'regulares';
  idioma: string = '';

  texto1: string = '';
  texto2: string = '';
  texto3: string = '';
  texto4: string = '';
  texto5: string = '';
  texto6: string = '';
  mensajedealerta: string = '';


  constructor(
    public route: ActivatedRoute,
    private location: Location,
    public verbosService: VerbosRegulares,
    public guardartexto: Guardartexto,
    public clear: Clear,
    public escribeService: EscribeS,
    public compararS: CompararS,
  ) { }

  ngOnInit() {
    const lang = this.route.snapshot.paramMap.get('lang');
    this.tenseDiv = true;
    this.divfortype = true;  
    this.activarBoton = false;  
    if (lang) {
      this.setTopByLang(lang);
      this.initVerbData(lang);
    }
  }

  setTopByLang(arg: string) {
    if (arg === 'es') {
      this.es = true;
      this.pt = false;
      this.mainTitle = 'Exercises to practice the Spanish language';
      this.homeRoute = '/';
      this.esFn();
    }
    if (arg === 'pt') {
      this.es = false;
      this.pt = true;
      this.mainTitle = 'Exercises to practice the Portuguese language';
      this.homeRoute = '/pt';
      this.ptFn();
    }
  }

  initVerbData(arg: string) {
    if (arg === 'es') {
      this.tiemposverbales = this.verbosService.captarEStiempos();
      this.verboslistado = this.verbosService.captarVerboES();
      this.verbosgrupo1 = this.verbosService.captarVerboESgrupo1();
      this.maximo = this.verbosService.captarMaxES();
      this.maximogrupo1 = this.verbosService.captarMaxESgrupo1();
      this.sujeto = this.verbosService.captarSujetoES();
      this.sujetoMax = this.verbosService.captarMaxSujES();
      this.conjugacion = this.verbosService.captarConjugES();
      this.idioma = 'es';
    }
    if (arg === 'pt') {
      this.tiemposverbales = this.verbosService.captarPTtiempos();
      this.verboslistado = this.verbosService.captarVerboPT();
      this.verbosgrupo1 = this.verbosService.captarVerboPTgrupo1();
      this.maximo = this.verbosService.captarMaxPT();
      this.maximogrupo1 = this.verbosService.captarMaxPTgrupo1();
      this.sujeto = this.verbosService.captarSujetoPT();
      this.sujetoMax = this.verbosService.captarMaxSujPT();
      this.conjugacion = this.verbosService.captarConjugPT();
      this.idioma = 'pt';
    }
  }

  // para definir el idioma de las instrucciones 
  ptFn() {
    this.texto1 = 'Esta é a tua resposta';
    this.texto2 = 'Não escreveu dados para comparação';
    this.texto3 = 'Gerar Sujetos e Verbos';
    this.texto4 = 'Selecionar um tempo verbal';
    this.texto5 = 'Não gerou um verbo para comparar';
    this.texto6 = 'O tempo verbal é:';
  }

  esFn() {
    this.texto1 = 'Esta es tu respuesta';
    this.texto2 = 'No has escrito datos para comparar';
    this.texto3 = 'Generar Sujetos y Verbos';
    this.texto4 = 'Selecciona un tiempo verbal';
    this.texto5 = 'No ha generado un verbo para comparar';
    this.texto6 = 'El tiempo verbal es:';
  }

  goBack() {
    this.location.back();
  }

  //capta seleccion de tiempo verbal
  
  tiempoSeleccionado: string = '';
  tiempoAjustado: string = '';
  tiempoAjustado2: string = '';

  onKey(event: any) { // without type info
    this.tiempoSeleccionado = event.target.value;
    this.tiempoAjustado = this.verbosService.ajustaTiempoVerbal(this.tiempoSeleccionado);
    this.tiempoAjustado2 = this.verbosService.ajustaTiempoVerbalCompuesto(this.tiempoSeleccionado);
    this.toggleTenseDiv();
    this.toggleActivarBoton();
  }

  toggleTenseDiv() {
    const newStatus = this.tenseDiv ? false : true;
    this.tenseDiv = newStatus;
  }

  toggleActivarBoton() {
    const newStatus = this.activarBoton ? false : true;
    this.activarBoton = newStatus;
  }

  // funciones para generar el verbo
  numeroGenerado: number = 0;
  numeroGeneradogrupo1: number = 0;
  numeroGenerado2: number = 0;
  verboGenerado: Verbo[] = [];
  verboString: string = '';
  ArErIr: string = '';
  baseVerbo: string = '';
  sujetoGenerado: sujeto = { id: 0, sujeto: '', conjug: '', verbo: '', idioma: '' };
  sujetoString: string = '';
  conjugSujeto: string = '';
  grupodeVerbos: string = '';
  verboConjugado: string = '';

  generarNumero() {
    this.numeroGenerado = this.verbosService.generarNumero(this.maximo);
    this.numeroGeneradogrupo1 = this.verbosService.generarNumero(this.maximogrupo1);
    this.numeroGenerado2 = this.verbosService.generarNumero(this.sujetoMax);
  }

  generarSujetos() {
    [this.sujetoGenerado] = this.verbosService.generarSujeto(this.numeroGenerado2, this.sujeto);
    this.sujetoString = this.sujetoGenerado.sujeto;
    this.conjugSujeto = this.sujetoGenerado.conjug;
    this.grupodeVerbos = this.sujetoGenerado.verbo;
  }

  generarVerbos() {
    this.verboGenerado = this.verbosService.generarVerbo(
      this.numeroGenerado,
      this.verboslistado,
      this.numeroGeneradogrupo1,
      this.verbosgrupo1,
      this.grupodeVerbos);
    this.verboString = this.verboGenerado[0].verbo;
    this.ArErIr = this.verboGenerado[0].terminacion;
    this.baseVerbo = this.verbosService.definirBase(this.verboString);
  }

  asignarRespuesta() {
    this.verboConjugado = this.verbosService.conjugarVerbo(
      this.conjugacion,
      this.ArErIr,
      this.baseVerbo,
      this.conjugSujeto,
      this.tiempoAjustado,
      this.tiempoAjustado2);
    this.guardartexto.palabraseleccionada = this.verboConjugado;
  }

  // funciones para captar la respuesta del usuario
  respuesta: string = '';
  arrayPalabra: string[] = [];
  arrayRespuesta: string[] = [];
  nuevoArray: string[] = [];
  aciertos: number = 0;
  percentAciertos: number = 0;
  mostrarIndicador: string = '';

  handleAnswer() {
    this.onGuardartexto();
    this.mensajedealerta = this.mensaje();
    switch (this.mensajedealerta === '') {
      case true:
        this.comparar();
        this.toogleSection();
        break;
      case false:
        break;
    }
  }


  onGuardartexto() {
    this.respuesta = this.guardartexto.depurar(this.escribeService.textodefinitivo);    //  extrae del texto ingresado los caracteres especiales
    this.escribeService.array = this.clear.clearArray(this.escribeService.array);
    this.escribeService.arraytexto = this.clear.clear(this.escribeService.arraytexto);
    this.respuesta = this.guardartexto.guardarDefinitivo(this.respuesta);   // guarda el texto ingresado(convertido en mayuscula) para COMPARAR
    return this.respuesta;
  };

  comparar() {
    if (this.verboConjugado) {
      this.arrayPalabra = this.compararS.crearArray(this.verboConjugado);
    }
    this.arrayRespuesta = this.compararS.crearArray(this.respuesta);
    this.nuevoArray = this.compararS.comparandoArrays(this.arrayPalabra, this.arrayRespuesta);
    this.aciertos = this.compararS.aciertos(this.nuevoArray);
    this.percentAciertos = this.compararS.porcentaje(this.nuevoArray, this.aciertos);
    this.mostrarIndicador = this.compararS.indicador(this.nuevoArray, this.percentAciertos);
  }

  toogleSection() {
    const newSection = this.divfortype ? false : true;
    this.divfortype = newSection;
  }

  mensaje(): string {
    if (this.guardartexto.palabraseleccionada === '') {
      return this.texto5;
    } else {
      if (this.guardartexto.textodefinitivo === '') {
        return this.texto2;
      } else {
        return "";
      }
    }
  }

  resetPrev(){
    this.sujetoString = "";
    this.verboString = "";
    this.verboConjugado = "";
    this.verboGenerado = [];
    this.respuesta = "";
  }

}
