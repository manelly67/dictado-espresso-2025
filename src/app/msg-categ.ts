import { Injectable, OnInit } from '@angular/core';
import { Categoria } from './categoria';
import { CATEGORIAS } from './CATEGORIAS';

@Injectable({
  providedIn: 'root',
})

export class MsgCateg implements OnInit {
  constructor() { }
  // contiene las categorías de la barra de navegación - para utilizarlas en el componente respectivo

  categoria: Categoria[] = CATEGORIAS;
  categorias = CATEGORIAS;

  ngOnInit() {
    this.captarCategorias();
  }

  captarCategorias(): Categoria[] {
    this.categorias = CATEGORIAS;
    return this.categorias;
  }

}
