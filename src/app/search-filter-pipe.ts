import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {

  transform(items: any[], searchCateg:string, searchSubCateg:string): any[] {
    if(!items || !searchCateg || !searchSubCateg){
      return items;
    }else{
      return items.filter((e) => e.category === searchCateg && e.subcategory === searchSubCateg);
    }
 
  }

}
