import { ComponentFixture, TestBed } from '@angular/core/testing';
import { PatientsListComponent } from './patients-list.component';
import { PatientsService } from '../patients.service';
import { of } from 'rxjs';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

describe('PatientsListComponent', () => {
  let component: PatientsListComponent;
  let fixture: ComponentFixture<PatientsListComponent>;
  let patientsServiceStub: any;

  beforeEach(() => {
    patientsServiceStub = {
      initialPatients: [],
      filters: {},
      getPatientsList: () => {
        return of([]);
      },
    };

    TestBed.configureTestingModule({
      declarations: [PatientsListComponent],
      providers: [{ provide: PatientsService, useValue: patientsServiceStub }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();

    fixture = TestBed.createComponent(PatientsListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  afterEach(() => {
    fixture.destroy();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should set filteredPatients and retained filters from PatientsService if there are initialPatients', () => {
    patientsServiceStub.initialPatients = [
      {
        id: '1',
        full_name: 'John Doe',
        age: '20',
        gender: 'male',
        email: 'x2z@g.c',
        avatar: '',
      },
    ];
    patientsServiceStub.filters = { age: '20' };

    component.ngOnInit();

    expect(component.filteredPatients).toEqual([
      {
        id: '1',
        full_name: 'John Doe',
        age: '20',
        gender: 'male',
        email: 'x2z@g.c',
        avatar: '',
      },
    ]);
    expect(component.filterAgeValue).toEqual('');
  });

  it('should check if setRetainedFilters is working fine', () => {
    component['patientsService'].filters = { Age: '20-25' };
    component.setRetainedFilters();
    expect(component.filterAgeValue).toBe('20-25');
  });

  it('should check if setRetainedFilters is working fine for Gender', () => {
    component['patientsService'].filters = { Gender: 'Male' };
    component.setRetainedFilters();
    expect(component.filterGenderValue).toBe('Male');
  });

  it('should check if setRetainedFilters is working fine when ther is no retained filters', () => {
    component.filterAgeValue = '';
    component['patientsService'].filters = {};
    component.setRetainedFilters();
    expect(component.filterAgeValue).toBe('');
  });

  it('should check if setRetainedFilters is working fine', () => {
    component['patientsService'].filters = { Sorting: 'None' };
    component.setRetainedFilters();
    expect(component.filterSortValue).toBe('None');
  });

  it('should call getPatientsList and set filteredPatients and filters on success', () => {
    spyOn(patientsServiceStub, 'getPatientsList').and.returnValue(
      of([
        {
          patient_id: '1',
          first_name: 'John',
          last_name: 'Doe',
          age: '20',
          gender: 'male',
          email: 'x2z@g.c',
          avatar: '',
        },
      ])
    );
    component.ngOnInit();
    expect(component.isLoading).toBe(false);
    expect(component.filteredPatients[0].id).toBe('1');
    expect(patientsServiceStub.initialPatients[0].id).toBe('1');
    expect(patientsServiceStub.filters).toEqual({});
  });

  it('should call handleFilterValue and update filters and filteredPatients accordingly', () => {
    patientsServiceStub.initialPatients = [
      {
        id: '1',
        full_name: 'John Doe',
        age: '21',
        gender: 'Male',
        email: 'x2z@g.c',
        avatar: '',
      },
      {
        id: '2',
        full_name: 'Jane Smith',
        age: '26',
        gender: 'Female',
        email: 'x2z@g.c',
        avatar: '',
      },
      {
        id: '3',
        full_name: 'Bob Johnson',
        age: '30',
        gender: 'Male',
        email: 'x2z@g.c',
        avatar: '',
      },
    ];

    component.handleFilterValue({ by: 'Age', value: '20-25' });

    expect(component['patientsService'].filters).toEqual({ Age: '20-25' });
    expect(component.filteredPatients).toEqual([
      {
        id: '1',
        full_name: 'John Doe',
        age: '21',
        gender: 'Male',
        email: 'x2z@g.c',
        avatar: '',
      },
    ]);
  });

  it('should call paginationHelper and update activePage and patientsShown accordingly', () => {
    patientsServiceStub.initialPatients = [
      { id: '1', full_name: 'John Doe', age: '20', gender: 'Male' },
      { id: '2', full_name: 'Jane Smith', age: '25', gender: 'Female' },
      { id: '3', full_name: 'Bob Johnson', age: '30', gender: 'Male' },
      { id: '4', full_name: 'Alice Lee', age: '35', gender: 'Female' },
      { id: '5', full_name: 'Tom Brown', age: '40', gender: 'Male' },
    ];

    component.filteredPatients = patientsServiceStub.initialPatients;
    component.paginationHelper(2);

    expect(component.activePage).toEqual(2);
  });
});
