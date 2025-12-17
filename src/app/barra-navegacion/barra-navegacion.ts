import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MsgCateg } from '../msg-categ';

@Component({
  selector: 'app-barra-navegacion',
  imports: [RouterLink],
  templateUrl: './barra-navegacion.html',
  styleUrl: './barra-navegacion.css',
})
export class BarraNavegacion {

  @Input() es?: boolean;
  @Input() pt?: boolean;
  lang?: string;

  constructor(public msgCateg: MsgCateg ) { }

  categoria = this.msgCateg.categoria;
  categorias = this.msgCateg.captarCategorias();

}
