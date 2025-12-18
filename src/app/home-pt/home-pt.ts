import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopInPage } from '../top-in-page/top-in-page';
import { BarraNavegacion } from '../barra-navegacion/barra-navegacion';


@Component({
  selector: 'app-home-pt',
  imports: [TopInPage, BarraNavegacion],
  templateUrl: './home-pt.html',
  styleUrl: './home-pt.css',
})
export class HomePT implements OnInit {
  btn1: string = "español";
  btn2: string = "portugués";

  es?: boolean;
  pt?: boolean;
  mainTitle: string = "";

  constructor(public router: Router) { }

  ngOnInit() {
    // Initial title
    if(!this.pt){
      this.es=false;
      this.pt=true;
    }
    this.setContent();
  }

  setContent() {
    if (this.es) {
      this.mainTitle = "Exercises to practice the Spanish language"
      this.router.navigate(['/']);  
    }
    if (this.pt) {
      this.mainTitle = "Exercises to practice the Portuguese language"
    }
  }


  setSP() {
    this.es = true;
    this.pt = false;
    this.setContent();
  }

  setPT() {
    this.pt = true;
    this.es = false;
    this.setContent();
  }



}
