import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'csp-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss'],
})
export class FiltersComponent implements OnChanges, AfterViewInit {
  @Input() filtersArray: string[] = [''];
  @Input() filterCriteria: string = '';
  @Input() retainedFilter: string = '';

  @Output() filtersValue = new EventEmitter();

  public selectedFilter: string = '';

  public filterValuesArray = [];

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes['retainedFilter']) {
      this.selectedFilterChange(this.retainedFilter);
    }
  }

  ngAfterViewInit(): void {
    this.selectedFilter = this.retainedFilter
      ? this.retainedFilter
      : this.filtersArray[0];
  }

  public selectedFilterChange(event: any): void {
    this.selectedFilter = event;
    this.filtersValue.emit({ value: event, by: this.filterCriteria });
  }
}
