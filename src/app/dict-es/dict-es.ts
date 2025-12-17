import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TopInPage } from '../top-in-page/top-in-page';

@Component({
  selector: 'app-dict-es',
  imports: [RouterLink,TopInPage],
  templateUrl: './dict-es.html',
  styleUrl: './dict-es.css',
})
export class DictES implements OnInit{
  es: boolean = true;
  pt: boolean = false;
  mainTitle: string = "Exercises to practice the Spanish language";
  categ?: number;

  constructor(public route: ActivatedRoute) { }
  ngOnInit() {
    const categGet = this.route.snapshot.paramMap.get('categ');
    if (categGet) {
      this.categ = Number(categGet);
    }
  }
}
