import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TopInPage } from '../top-in-page/top-in-page';
import { BarraNavegacion } from '../barra-navegacion/barra-navegacion';

@Component({
  selector: 'app-home',
  imports: [TopInPage, BarraNavegacion],
  templateUrl: './home.html',
  styleUrl: './home.css',
})

export class Home implements OnInit {

  btn1: string = "español";
  btn2: string = "portugués";

  es?: boolean;
  pt?: boolean;
  mainTitle: string = "";

  constructor(public router: Router) { }
 

  ngOnInit() {
    // Initial title
    if(!this.es){
      this.es=true;
      this.pt=false;
    }
    this.setContent();
  }

  setContent() {
    if (this.es) {
      this.mainTitle = "Exercises to practice the Spanish language"
    }
    if (this.pt) {
      this.mainTitle = "Exercises to practice the Portuguese language"
      this.router.navigate(['/pt']);        
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
