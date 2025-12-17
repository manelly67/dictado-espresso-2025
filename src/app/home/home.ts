import { Component, OnInit } from '@angular/core';
import { RouterLink } from '@angular/router';
import { NgClass } from '@angular/common';
import { ToggleTheme } from '../toggle-theme/toggle-theme';
import { BarraNavegacion } from '../barra-navegacion/barra-navegacion';

@Component({
  selector: 'app-home',
  imports: [RouterLink,NgClass ,ToggleTheme, BarraNavegacion],
  templateUrl: './home.html',
  styleUrl: './home.css',
})
export class Home implements OnInit {

  btn1:string="español";
  btn2:string="portugués";

  es:boolean=true;
  pt:boolean=false;
  mainTitle:string="";

  ngOnInit() {
    // Apply initial theme
    this.setContent();
  }

  setContent(){
    if(this.es){
     this.mainTitle = "Exercises to practice the Spanish language"
    }
    if(this.pt){
      this.mainTitle = "Exercises to practice the Portuguese language"
    }
  }

  setSP(){
    this.es = true;
    this.pt = false;
    this.setContent();
  }

  setPT(){
    this.pt = true;
    this.es = false;
    this.setContent();
  }
  
}
