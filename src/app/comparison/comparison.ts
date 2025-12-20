import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-comparison',
  imports: [NgClass],
  templateUrl: './comparison.html',
  styleUrl: './comparison.css',
})
export class Comparison {
@Input() es?:boolean;
@Input() pt?:boolean;
@Input() nuevoArray?:string[];
@Input() aciertos?:number;
@Input() percentAciertos?:number;
@Input() mostrarIndicador?:string;


}
