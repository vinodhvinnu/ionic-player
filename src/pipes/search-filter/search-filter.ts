import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'searchFilter',
})
export class SearchFilterPipe implements PipeTransform {
  
  transform(items: any[], filterBy: string): any {
    if(filterBy && filterBy != null) {
      return items.filter(item => item.name.toLowerCase().indexOf(filterBy.toLowerCase()) !== -1);
    }
    return items;
  }
}
