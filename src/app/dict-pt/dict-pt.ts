import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { TopInPage } from '../top-in-page/top-in-page';

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

  constructor(public route: ActivatedRoute) { }
  ngOnInit() {
    const categGet = this.route.snapshot.paramMap.get('categ');
    if (categGet) {
      this.categ = Number(categGet);
    }
  }
}
