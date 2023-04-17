import { Injectable, Pipe, PipeTransform } from '@angular/core';

export type SortOrder = 'Ascending' | 'Descending';

@Injectable()
@Pipe({
  name: 'sort',
})
export class SortPipe implements PipeTransform {

   
  /**
   * Pipe Sorts the list of elements based on the SortOrder provided
   *
   * @param value list of elements to search in
   * @param sortOrder sort order to sort the list
   * @param sortKey with which property to sort
   * @returns list of elements filtered by search text or []
   */
  transform(value: any[], sortOrder: SortOrder | string = 'none', sortKey?: string): any {
    sortOrder = sortOrder && (sortOrder.toLowerCase() as any);

    if (!value || (sortOrder !== 'ascending' && sortOrder !== 'descending')) return value;

    let numberArray = [];
    let stringArray = [];

    if (!sortKey) {
      numberArray = value.filter(item => typeof item === 'number').sort();
      stringArray = value.filter(item => typeof item === 'string').sort();
    } else {
      numberArray = value.filter(item => typeof item[sortKey] === 'number').sort((a, b) => a[sortKey] - b[sortKey]);
      stringArray = value
        .filter(item => typeof item[sortKey] === 'string')
        .sort((a, b) => {
          if (a[sortKey] < b[sortKey]) return -1;
          else if (a[sortKey] > b[sortKey]) return 1;
          else return 0;
        });
    }
    const sorted = numberArray.concat(stringArray);
    return sortOrder === 'ascending' ? sorted : sorted.reverse();
  }
}
