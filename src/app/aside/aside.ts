import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-aside',
  imports: [],
  templateUrl: './aside.html',
  styleUrl: './aside.css',
})
export class Aside {
  @Input() es?:boolean; 
  @Input() pt?:boolean;
}
