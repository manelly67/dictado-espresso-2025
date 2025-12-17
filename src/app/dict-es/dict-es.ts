import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, Router } from '@angular/router';
import { Location } from '@angular/common';
import { TopInPage } from '../top-in-page/top-in-page';
import { Categoria } from '../categoria';
import { MsgCateg } from '../msg-categ';

@Component({
  selector: 'app-dict-es',
  imports: [RouterLink, TopInPage],
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
    { id: 1, url: "/dictadoEs/1", text: 'Beginner' },
    { id: 2, url: "/dictadoEs/2", text: 'Intermediate' },
    { id: 3, url: "/dictadoEs/3", text: 'Advanced' }
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
