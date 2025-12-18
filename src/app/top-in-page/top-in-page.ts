import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';
import { ToggleTheme } from '../toggle-theme/toggle-theme';


@Component({
  selector: 'app-top-in-page',
  imports: [NgClass,ToggleTheme],
  templateUrl: './top-in-page.html',
  styleUrl: './top-in-page.css',
})
export class TopInPage  {

  btn1:string="español";
  btn2:string="portugués";
 

  @Input() es?:boolean; 
  @Input() pt?:boolean;
  @Input() mainTitle?:string;

  

}
