/**
 * Test cases for 'patient' model
 */

import { Patient } from "./patient.modal";


const fromJsonMock = {"patient_id":2,"first_name":"Lydon","last_name":"Dymock","email":"ldymock1@techcrunch.com","gender":"Female","age":64,"avatar":"http://dummyimage.com/221x100.png/ff4444/ffffff"}
     

 describe('Patient Model', () => {
 
   it('should declare default values', () => {
     const patient = new Patient();
     expect(patient.id).not.toBeNull();
     expect(patient.full_name).not.toBeNull();
     expect(patient.age).not.toBeNull();
   });
 
   it('should check if from Json is working fine', () => {
     const patient = Patient.fromJson(fromJsonMock);
     expect(patient.age).toBe('64');
     expect(patient.full_name).toBe('Lydon Dymock');
     expect(patient.id).toBe('2');
   });
 
 });