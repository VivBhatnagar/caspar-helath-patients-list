import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Patient } from './patient.modal';

@Injectable({
  providedIn: 'root',
})
export class PatientsService {
  public initialPatients: Patient[] = [];
  public jsonFileLoc = 'assets/json/mock_data.json';
  public filters: Record<string, string> = {};

  constructor(private readonly httpClient: HttpClient) {}

  /**
   *  Method to get all the list of Patients
   */
  public getPatientsList(): Observable<any> {
    return this.httpClient.get(this.jsonFileLoc);
  }

  /**
   *  Method to get all details of Patient by Id
   */
  public getPatientById(id: string): Patient | undefined {
    return this.initialPatients.find((patient) => patient.id === id);
  }
}
