import { Component, Input, EventEmitter, Output, OnInit } from '@angular/core';
import { NgIcon } from '@ng-icons/core';

import { DOCUMENT, NgClass } from '@angular/common';
import { Inject } from '@angular/core';
import { Renderer2 } from '@angular/core';

@Component({
  selector: 'app-toggle-theme',
  imports: [NgIcon, NgClass],
  templateUrl: './toggle-theme.html',
  styleUrl: './toggle-theme.css',
})
export class ToggleTheme implements OnInit {

  /*  @Input() light?:boolean; 
   @Output() lightChange = new EventEmitter<boolean>();
   nameIcon:string= this.light? 'featherMoon' : 'featherSun';
 
   */

  theme = 'theme-light';
  light:boolean = true;
  nameIcon:string= this.light? 'featherMoon' : 'featherSun';

  constructor(
    @Inject(DOCUMENT) private document: Document,
    private renderer: Renderer2
  ) { }

  ngOnInit() {
    // Apply initial theme
    this.updateBodyClass();
  }

  toggleTheme() {
    const body = this.document.body;
    let newTheme = this.theme === 'theme-light' ? 'theme-dark' : 'theme-light';
    this.theme = newTheme;
    body.className = '';
    body.classList.add(this.theme);
    this.toggleIcon();
  }

  toggleIcon(){
    let newIcon = this.light ? false: true;
    this.light = newIcon;
    this.nameIcon = this.light? 'featherMoon' : 'featherSun';
  }

  private updateBodyClass() {
    const body = this.document.body;
    body.className = '';
    body.classList.add(this.theme);
  }

}
