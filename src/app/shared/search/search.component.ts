import {
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Subject } from 'rxjs';
import { Patient } from '../../patient.modal';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'csp-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.scss'],
})
export class SearchComponent implements OnInit {
  @Input() searchData: Patient[] = [];
  @Input()
  searchParam!: string;
  @Input() searchText = 'Search';
  @Output() searchDataChange = new EventEmitter<Patient[]>();
  @ViewChild('searchInput')
  public searchInput!: ElementRef;
  private debounceTextChange$ = new Subject<string>();
  @Input('clonedData')
  clonedData!: Patient[];
  public filterString = '';

  ngOnInit(): void {
    if (!this.clonedData) {
      this.clonedData = [...this.searchData];
    }
    this.debounceTextChange$
      .pipe(debounceTime(500), distinctUntilChanged())
      .subscribe(() => {
        this.setFilters();
      });
  }

  /**
   *  setFilter to set the filter and emit the search data to parent
   */
  public setFilters(): void {
    this.searchData = this.clonedData.filter(
      (item: { [x: string]: any; gender: any; age: any; avatar: any }) => {
        const { gender, age, avatar, ...a } = item;
        return Object.values(a)
          .join(' ')
          .toLowerCase()
          .includes(this.filterString.toLowerCase());
      }
    );
    this.searchDataChange.emit(this.searchData);
  }

  /**
   * filterChange to trriger Searching with debounce of 500ms
   */
  public filterChange(): void {
    this.debounceTextChange$.next(this.filterString);
  }

  /**
   * resetFilter to reset the filter and display the initial data before search
   */
  public resetFilter(): void {
    this.filterString = '';
    this.searchInput.nativeElement.focus();
    this.setFilters();
  }
}
