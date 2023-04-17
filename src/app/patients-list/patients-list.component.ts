import { Component, OnInit } from '@angular/core';
import { FilterByAge, FilterByGender, Filters, SortByOrder } from 'src/globals';
import { Patient } from '../patient.modal';
import { PatientsService } from '../patients.service';
import { filterByAge, filterByGender } from '../utils/filterHelpers';

@Component({
  selector: 'csp-patients-list',
  templateUrl: './patients-list.component.html',
  styleUrls: ['./patients-list.component.scss'],
})
export class PatientsListComponent implements OnInit {
  public filteredPatients: Patient[] = [];
  public patientsShown: Patient[] = [];
  public activePage = 1;
  public pageSize = 30;
  public searchText = '';
  public isLoading = false;
  public filterByAgeData = Object.values(FilterByAge);
  public filterByGenderData = Object.values(FilterByGender);
  public filterForSortingData = Object.values(SortByOrder);
  public sortingOrder = 'None';
  public errorText = 'Patient Does not Exist';
  public filterAgeValue = '';
  public filterSortValue = '';
  public filterGenderValue = '';
  orignalFilteredPatients: Patient[] = [];

  constructor(private readonly patientsService: PatientsService) {}

  ngOnInit(): void {
    if (this.patientsService.initialPatients.length > 0) {
      this.filteredPatients = this.patientsService.initialPatients;
      this.setRetainedFilters();
      return;
    }
    this.isLoading = true;
    this.patientsService.getPatientsList().subscribe((res) => {
      this.patientsService.initialPatients = res.map((patient: Patient) =>
        Patient.fromJson(patient)
      );
      this.filteredPatients = this.patientsService.initialPatients;
      this.orignalFilteredPatients = [...this.filteredPatients];

      this.isLoading = false;
    });
  }

  public setRetainedFilters(): void {
    const retainedFilters = this.patientsService.filters;
    if (Object.keys(retainedFilters).length === 0) {
      return;
    }

    if (retainedFilters[Filters.AGE]) {
      this.filterAgeValue = retainedFilters[Filters.AGE];
    }
    if (retainedFilters[Filters.GENDER]) {
      this.filterGenderValue = retainedFilters[Filters.GENDER];
    }
    if (retainedFilters[Filters.SORTING]) {
      this.filterSortValue = retainedFilters[Filters.SORTING];
    }
  }

  public handleFilterValue(filterValue: { by: string; value: string }): void {
    this.patientsService.filters[filterValue.by] = filterValue.value;
    const filteredByAge = filterByAge(
      this.patientsService.initialPatients,
      this.patientsService.filters[Filters.AGE]
    );
    this.filteredPatients = filterByGender(
      filteredByAge,
      this.patientsService.filters[Filters.GENDER]
    );
    this.sortingOrder = this.patientsService.filters[Filters.SORTING];
    this.orignalFilteredPatients = [...this.filteredPatients];
  }

  public paginationHelper(activePageNumber: number): void {
    this.activePage = activePageNumber;
    this.patientsShown = this.filteredPatients.slice(
      (this.activePage - 1) * this.pageSize,
      this.activePage * this.pageSize
    );
  }
}
