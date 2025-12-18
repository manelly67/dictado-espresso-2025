import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TopInPage } from '../top-in-page/top-in-page';
import { Categoria } from '../categoria';
import { MsgCateg } from '../msg-categ';
import { LETRASDEAUDIOS } from '../LETRASDEAUDIOS';
import { Esfera } from '../esfera/esfera';

@Component({
  selector: 'app-dict-es',
  imports: [RouterLink, TopInPage, Esfera],
  templateUrl: './dict-es.html',
  styleUrl: './dict-es.css',
})
export class DictES implements OnInit {
  es: boolean = true;
  pt: boolean = false;
  mainTitle: string = "Exercises to practice the Spanish language";
  categ?: number;
  filterObj?: Categoria;
  arrOpt = [
    { id: 1, url: "/dictadoEs/1", text: 'Beginner', nivelinservice: 'principiante' },
    { id: 2, url: "/dictadoEs/2", text: 'Intermediate', nivelinservice: 'intermedio' },
    { id: 3, url: "/dictadoEs/3", text: 'Advanced', nivelinservice: 'avanzado' }
  ];
  arr?: Array<{ id: number, url: string, text: string, nivelinservice:string }>;
  nivel?:string;
  nro:number=0;
  amountAud:number=0;

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public msgCateg: MsgCateg,
    private location: Location,
  ) { }

  categoria = this.msgCateg.categoria;
  categorias = this.msgCateg.captarCategorias();


  ngOnInit() {
    const categGet = this.route.snapshot.paramMap.get('categ');
    if (categGet) {
      this.categ = Number(categGet);
      [this.filterObj] = this.categorias.filter((e) => e.id === this.categ);
      this.arr = this.arrOpt.filter((e) => e.id !== this.categ);
      this.nivel = this.getNivelForService();
      this.amountAud = this.getAmountAudios(this.nivel);
    }
  }

  getNivelForService(){
    const [filtered] = this.arrOpt.filter((e) => e.id === this.categ);
    return filtered.nivelinservice;
  }

  getAmountAudios(arg:string):number{
   const filtered = LETRASDEAUDIOS.filter((e)=> e.nivel===arg);
   return filtered.length;
  }

  getNumbers(): number[] {
    return Array.from({ length: this.amountAud }, (_, i) => i + 1);
  }

   /* functions necessary for reload the page by new params */
  goBack(): void {
    this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.location.back();
    });
  }

  navigateToA(): void{
    if(this.arr){
      const newRoute= this.arr[0].url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([newRoute]);
      });
    }
   }
   navigateToB(): void{
    if(this.arr){
      const newRoute= this.arr[1].url;
      this.router.navigateByUrl('/', { skipLocationChange: true }).then(() => {
        this.router.navigate([newRoute]);
      });
    }
   }

  

}
