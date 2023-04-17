import {
  ComponentFixture,
  fakeAsync,
  TestBed,
  tick,
} from '@angular/core/testing';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { PatientsService } from '../patients.service';
import { PateintDetailsComponent } from './pateint-details.component';

describe('PateintDetailsComponent', () => {
  let component: PateintDetailsComponent;
  let fixture: ComponentFixture<PateintDetailsComponent>;
  let patientsService: PatientsService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PateintDetailsComponent],
      providers: [
        {
          provide: ActivatedRoute,
          useValue: {
            queryParams: {
              subscribe: (fn: (value: any) => void) => fn({ id: 'patient1' }),
            },
          },
        },
        {
          provide: PatientsService,
          useValue: {
            getPatientById: jasmine
              .createSpy('getPatientById')
              .and.returnValue({
                id: 'patient1',
                name: 'John Doe',
                age: '30',
                gender: 'male',
                email: 'john.doe@example.com',
              }),
            getPatientsList: () => [],
            initialPatients: [
              {
                id: 'patient1',
                name: 'John Doe',
                age: '30',
                gender: 'male',
                email: 'john.doe@example.com',
              },
              {
                id: 'patient2',
                name: 'Jane Doe',
                age: '25',
                gender: 'female',
                email: 'jane.doe@example.com',
              },
            ],
          },
        },
        {
          provide: Router,
          useValue: {
            navigate: jasmine.createSpy('navigate'),
          },
        },
      ],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PateintDetailsComponent);
    component = fixture.componentInstance;
    patientsService = TestBed.inject(PatientsService);
    router = TestBed.inject(Router);
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should check if ngOnInit is working fine when initialPatients length is 0', fakeAsync(() => {
    component['patientsService'].initialPatients = [];
    const obsSpy = spyOn(
      component['patientsService'],
      'getPatientsList'
    ).and.returnValue(
      new Observable((obs) => {
        obs.next([
          {
            patient_id: 1,
            first_name: 'John',
            last_name: 'Doe',
            age: 30,
            gender: 'male',
            email: 'john.doe@example.com',
          },
        ]);
        obs.complete();
      })
    );
    component.ngOnInit();
    tick();
    expect(obsSpy).toHaveBeenCalled();
  }));

  it('should initialize patient data and loading state', () => {
    expect(component.isLoadingData).toBeFalse();
    expect(component.patientData).toEqual({
      id: 'patient1',
      name: 'John Doe',
      age: '30',
      gender: 'male',
      email: 'john.doe@example.com',
    });
  });

  it('should open delete modal', () => {
    component.openDeleteModal();
    expect(component.isDeleteModalOpen).toBeTrue();
  });

  it('should close delete modal', () => {
    component.isDeleteModalOpen = true;
    component.onCloseClick();
    expect(component.isDeleteModalOpen).toBeFalse();
  });

  it('should delete patient and navigate to home', () => {
    component.handleDelete('patient1');
    expect(patientsService.initialPatients.length).toBe(1);
    expect(patientsService.initialPatients[0].id).toBe('patient2');
    expect(component.isDeleteModalOpen).toBeFalse();
    expect(router.navigate).toHaveBeenCalledWith(['/home']);
  });
});
