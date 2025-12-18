import { Component, Input } from '@angular/core';
import { NgClass } from '@angular/common';

@Component({
  selector: 'app-esfera',
  imports: [NgClass],
  templateUrl: './esfera.html',
  styleUrl: './esfera.css',
})
export class Esfera {
@Input() ix?:number;

}
