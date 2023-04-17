import { NO_ERRORS_SCHEMA } from '@angular/core';
import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltersComponent } from './filters.component';

describe('FiltersComponent', () => {
  let component: FiltersComponent;
  let fixture: ComponentFixture<FiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [FiltersComponent],
      schemas: [NO_ERRORS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(FiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should chek ngAfterViewInit is setting selectFilter correctly when retainedFilter is present', () => {
    component.retainedFilter = 'testRetained';
    component.ngAfterViewInit();
    expect(component.selectedFilter).toBe('testRetained');
  });

  it('should chek ngOnChanges is setting selectFilter correctly when retainedFilter is present', () => {
    component.retainedFilter = 'testRetained';
    component.ngOnChanges({
      retainedFilter: {
        currentValue: 'testValue',
        previousValue: 'testPrev',
        firstChange: true,
        isFirstChange: () => true,
      },
    });
    expect(component.selectedFilter).toBe('testRetained');
  });

  it('should check if selectedFilterChange is working fine', () => {
    component.filterCriteria = 'testCreiteria';
    const emitSpy = spyOn(component.filtersValue, 'emit');
    component.selectedFilterChange('testFilterstring');
    expect(emitSpy).toHaveBeenCalledWith({
      value: 'testFilterstring',
      by: component.filterCriteria,
    });
  });
});
