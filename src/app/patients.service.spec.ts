import { HttpClient } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';

import { PatientsService } from './patients.service';

class HttpClientMock {
  get() {
    return;
  }
}

describe('PatientsService', () => {
  let service: any;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        PatientsService,
        { provide: HttpClient, useClass: HttpClientMock },
      ],
    });
    service = TestBed.inject(PatientsService);
  });

  afterEach(() => {
    service = null;
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should check if getPatientsList is working fine', () => {
    const getSpy = spyOn(service['httpClient'], 'get');
    service.getPatientsList();
    expect(getSpy).toHaveBeenCalledWith(service.jsonFileLoc);
  });

  it('should check if getPatientById is working fine', () => {
    service.initialPatients = [{ id: '2', age: '10', full_Name: 'Vivaan' }];
    const pateintObj = service.getPatientById('2');
    console.log(pateintObj);
    expect(pateintObj.full_Name).toEqual('Vivaan');
  });
});
