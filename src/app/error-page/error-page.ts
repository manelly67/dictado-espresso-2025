import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { TopInPage } from '../top-in-page/top-in-page';

@Component({
  selector: 'app-error-page',
  imports: [TopInPage, RouterLink],
  templateUrl: './error-page.html',
  styleUrl: './error-page.css',
})
export class ErrorPage {

  es: boolean=false;
  pt: boolean=false;
  mainTitle: string = "";

}
