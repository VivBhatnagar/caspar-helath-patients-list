import { ComponentFixture, TestBed } from '@angular/core/testing';
import { By } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { Component, DebugElement } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { PatientsService } from 'src/app/patients.service';
import { SearchComponent } from './search.component';

const patientsServiceMock = {
  getPatientsList: () =>
    new Observable((obs) => {
      obs.next([]);
    }),
};

describe('SearchComponent', () => {
  let component: SearchComponent;
  let fixture: ComponentFixture<SearchComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SearchComponent],
      imports: [FormsModule],
      providers: [{ provide: PatientsService, useValue: patientsServiceMock }],
    }).compileComponents();

    fixture = TestBed.createComponent(SearchComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should initialize with empty search data and searchText', () => {
    expect(component.searchData).toEqual([]);
    expect(component.searchText).toBe('Search');
  });

  it('should debounce text changes and set filters', () => {
    const setFiltersSpy = spyOn(component, 'setFilters');
    const input = fixture.debugElement.query(By.css('input'));

    input.nativeElement.value = 'test';
    input.nativeElement.dispatchEvent(new Event('input'));

    expect(setFiltersSpy).not.toHaveBeenCalled();

    const debounceTimeMs = 500;
    const debounceTextChange$ = new Subject<string>();
    debounceTextChange$.pipe(debounceTime(debounceTimeMs)).subscribe(() => {
      expect(setFiltersSpy).toHaveBeenCalled();
    });

    component['debounceTextChange$'] = debounceTextChange$;
    input.nativeElement.value = 'test';
    input.nativeElement.dispatchEvent(new Event('input'));
  });

  it('should check if filterChange is working fine', () => {
    const nextSpy = spyOn(component['debounceTextChange$'], 'next');
    component.filterChange();
    expect(nextSpy).toHaveBeenCalled();
  });

  it('should set filters and emit search data when filters are changed', () => {
    const searchDataChangeSpy = spyOn(component.searchDataChange, 'emit');
    component.clonedData = [
      {
        full_name: 'Alice',
        gender: 'female',
        age: '25',
        id: '2',
        email: 'xyz@g.c',
        avatar: '',
      },
      {
        full_name: 'Bob',
        id: '12',
        age: '30',
        gender: 'male',
        email: 'x2z@g.c',
        avatar: '',
      },
    ];

    component.filterString = 'alice';
    component.setFilters();

    expect(component.searchData).toEqual([
      {
        full_name: 'Alice',
        gender: 'female',
        age: '25',
        id: '2',
        email: 'xyz@g.c',
        avatar: '',
      },
    ]);
    expect(searchDataChangeSpy).toHaveBeenCalledWith([
      {
        full_name: 'Alice',
        gender: 'female',
        age: '25',
        id: '2',
        email: 'xyz@g.c',
        avatar: '',
      },
    ]);

    component.filterString = '';
    component.setFilters();

    expect(component.searchData).toEqual(component.clonedData);
    expect(searchDataChangeSpy).toHaveBeenCalledWith(component.clonedData);
  });

  it('should reset filters and display initial data', () => {
    const setFiltersSpy = spyOn(component, 'setFilters');
    component.clonedData = [
      {
        full_name: 'Alice',
        gender: 'female',
        age: '25',
        id: '2',
        email: 'xyz@g.c',
        avatar: '',
      },
      {
        full_name: 'Bob',
        gender: 'male',
        age: '30',
        id: '12',
        email: 'x2z@g.c',
        avatar: '',
      },
    ];
    component.searchData = [
      {
        full_name: 'Alice',
        gender: 'female',
        age: '25',
        id: '2',
        email: 'xyz@g.c',
        avatar: '',
      },
      {
        full_name: 'Bob',
        gender: 'male',
        age: '30',
        id: '12',
        email: 'x2z@g.c',
        avatar: '',
      },
    ];
    component.filterString = 'alice';

    component.resetFilter();

    expect(component.filterString).toBe('');
  });
});
