import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TopInPage } from '../top-in-page/top-in-page';
import { Categoria } from '../categoria';
import { MsgCateg } from '../msg-categ';
import { LETRASDEAUDIOSPT } from '../LETRASDEAUDIOSPT';
import { Esfera } from '../esfera/esfera';

@Component({
  selector: 'app-dict-pt',
  imports: [RouterLink,TopInPage,Esfera],
  templateUrl: './dict-pt.html',
  styleUrl: './dict-pt.css',
})
export class DictPT implements OnInit{
  es: boolean = false;
  pt: boolean = true;
  mainTitle: string = "Exercises to practice the Portuguese language";
  categ?: number;
  filterObj?: Categoria;
  arrOpt = [
    { id: 11, url: "/dictadoPt/11", text: 'Beginner', nivelinservice: 'principiantept'  },
    { id: 12, url: "/dictadoPt/12", text: 'Intermediate', nivelinservice: 'intermediopt'  },
    { id: 13, url: "/dictadoPt/13", text: 'Advanced', nivelinservice: 'avanzadopt'  }
  ];
  arr?: Array<{ id: number, url: string, text: string, nivelinservice: string }>;
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
      const filtered = LETRASDEAUDIOSPT.filter((e)=> e.nivel===arg);
      return filtered.length;
     }

     getNumbers(): number[] {
      return Array.from({ length: this.amountAud }, (_, i) => i + 1);
    }

    getSelected(arg:number){
      this.nro=arg;
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
         this.router.navigateByUrl('/', { skipLocationChange: false }).then(() => {
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
