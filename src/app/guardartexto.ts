import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Guardartexto {
  constructor() { }

  palabraseleccionada: string = '';              /* almacena la palabra seleccionada */
  textodefinitivo: string = '';           /* almacena el texto definitivo para una posterior comparacion*/

  depurar<Type>(arg: string): string {
    arg = arg.replace(/(,)/gm, "");         		// extrae de el texto ingresado el caracter (,)
    arg = arg.replace(/(:)/gm, "");         		// extrae de el texto ingresado el caracter (:)
    arg = arg.replace(/(")/gm, "");         		// extrae de el texto ingresado el caracter (")
    arg = arg.replace(/(!)/gm, "");         		// extrae de el texto ingresado el caracter (!)
    arg = arg.replace(/(\u0028)/gm, "");  		// extrae de el texto ingresado el caracter (()
    arg = arg.replace(/(\u00A1)/gm, "");  		// extrae de el texto ingresado el caracter (¡)
    arg = arg.replace(/(\u00bf)/gm, "");  		// extrae de el texto ingresado el caracter (¿)
    arg = arg.replace(/(\u003F)/gm, "");  		// extrae de el texto ingresado el caracter (?)
    arg = arg.replace(/(\u002E)/gm, "");  		// extrae de el texto ingresado el caracter (.)
    arg = arg.replace(/(\u0029)/gm, "");  		// extrae de el texto ingresado el caracter ())
    arg = arg.replace(/(\u0040)/gm, "");  		// extrae de el texto ingresado el caracter (@)
    arg = arg.replace(/(\u0024)/gm, "");  		// extrae de el texto ingresado el caracter ($)
    arg = arg.replace(/(%)/gm, "");  				// extrae de el texto ingresado el caracter (%)
    arg = arg.replace(/(})/gm, "");  				// extrae de el texto ingresado el caracter (})
    arg = arg.replace(/(])/gm, "");  				// extrae de el texto ingresado el caracter (])
    arg = arg.replace(/({)/gm, "");  				// extrae de el texto ingresado el caracter ({)
    arg = arg.replace(/(\u005B)/gm, "");  		// extrae de el texto ingresado el caracter ([)
    return arg;
  }


  guardarSeleccion<Type>(arg: string): string {              // guarda el texto recibido convertido en mayusculas
    arg = arg.toUpperCase();
    arg = arg.trimEnd();
    this.palabraseleccionada = arg;
    return this.palabraseleccionada;			/* almacena la palabra seleccionada */
  }


  guardarDefinitivo<Type>(arg: string): string {              // guarda el texto recibido convertido en mayusculas
    arg = arg.toUpperCase();
    arg = arg.trimEnd();
    this.textodefinitivo = arg;
    return this.textodefinitivo;					/* almacena el texto definitivo para una posterior comparacion*/
  }



}
