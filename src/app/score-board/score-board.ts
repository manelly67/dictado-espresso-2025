import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from "@angular/router";
import { Location } from '@angular/common';
import { Point } from '../point';
import { MyScore } from '../my-score';
import { TopInPage } from '../top-in-page/top-in-page';
import { EStiemposverbales } from '../tiemposverbales-es';
import { PTtiemposverbales } from '../tiemposverbales-pt';
import { FieldSumPipe } from '../field-sum-pipe';
import { SearchFilterPipe } from '../search-filter-pipe';

@Component({
  selector: 'app-score-board',
  imports: [RouterLink, TopInPage,FieldSumPipe,SearchFilterPipe],
  templateUrl: './score-board.html',
  styleUrl: './score-board.css',
})
export class ScoreBoard implements OnInit {
  es?: boolean;
  pt?: boolean;
  mainTitle?: string;
  homeRoute?: string;
  title?: string;
  text1?: string;
  data: Point[] = [];
  isData: boolean=false;
  consolidate: any = new Object();
  tableForEs:boolean=false;
  tableForPt:boolean=false;
  categsForEs:string[]=[];
  categsForPt:string[]=[];
  subcategsForEs:string[]=[];
  subcategsForPt:string[]=[];
  audioSubCategEs:string[]=["beginner/ principiante","intermediate/ intermedio","advanced/ avanzado"];
  verbSubCategEs:string[]=EStiemposverbales;
  audioSubCategPt:string[]=["beginner/ principiante","intermediate/ intermédio","advanced/ avançado"];
  verbSubCategPt:string[]=PTtiemposverbales;

  constructor(
    public route: ActivatedRoute,
    private location: Location,
    public myScore: MyScore,
  ) { }

  ngOnInit() {
    const lang = this.route.snapshot.paramMap.get('lang');
    if (lang) {
      this.setTopByLang(lang);
      const storedData = localStorage.getItem("scoredata");
      this.data = storedData ? JSON.parse(storedData) : [];
      this.handleTheData(this.data);
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

  esFn() {
    this.title = 'tablero de desempeño';
    this.text1 = 'no hay datos para mostrar';
  }

  ptFn() {
    this.title = 'quadro de desempenho';
    this.text1 = 'não há dados para mostrar';
  }

  handleTheData(updated:Point[]){
    this.myScore.data = updated;
    this.isData = updated.length === 0 ? false : true;
    if (this.isData) {
      this.consolidate = this.myScore.getConsolidateData();

      if(this.consolidate["ES"]["summaryES"]){
        if(this.consolidate["ES"]["summaryES"].length>0){
          this.tableForEs=true;
          this.categsForEs=this.myScore.categoriesForES;
          this.subcategsForEs=this.myScore.subCategForES;
         }
      }
      
      if(this.consolidate["PT"]["summaryPT"]){
        if(this.consolidate["PT"]["summaryPT"].length>0){
          this.tableForPt=true;
          this.categsForPt=this.myScore.categoriesForPT;
          this.subcategsForPt=this.myScore.subCategForPT;
         }
      }
    }

    
  }

  goBack() {
    this.location.back();
  }


}
