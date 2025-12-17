import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TopInPage } from '../top-in-page/top-in-page';
import { Categoria } from '../categoria';
import { MsgCateg } from '../msg-categ';

@Component({
  selector: 'app-dict-pt',
  imports: [RouterLink,TopInPage],
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
    { id: 11, url: "/dictadoEs/11", text: 'Beginner' },
    { id: 12, url: "/dictadoEs/12", text: 'Intermediate' },
    { id: 13, url: "/dictadoEs/13", text: 'Advanced' }
  ];
  arr?: Array<{ id: number, url: string, text: string }>;

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
      }
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
