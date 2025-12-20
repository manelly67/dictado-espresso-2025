import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-teclado-pt',
  imports: [],
  templateUrl: './teclado-pt.html',
  styleUrl: './teclado-pt.css',
})
export class TecladoPt {

  @Output() notifyA1 = new EventEmitter();
  @Output() notifyA2 = new EventEmitter();
  @Output() notifyA3 = new EventEmitter();
  @Output() notifyA4 = new EventEmitter();
  @Output() notifyC = new EventEmitter();
  @Output() notifyE1 = new EventEmitter();
  @Output() notifyE2 = new EventEmitter();
  @Output() notifyI = new EventEmitter();
  @Output() notifyO1 = new EventEmitter();
  @Output() notifyO2 = new EventEmitter();
  @Output() notifyO3 = new EventEmitter();
  @Output() notifyU1 = new EventEmitter();
  @Output() notifyU2 = new EventEmitter();
  @Output() notifyN = new EventEmitter();
  @Output() notifyInterr = new EventEmitter();
  @Output() notifyExclam = new EventEmitter();

}
