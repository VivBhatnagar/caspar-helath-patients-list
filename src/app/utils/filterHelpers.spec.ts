import { FilterByAge, FilterByGender } from 'src/globals';
import { Patient } from '../patient.modal';
import { filterByAge, filterByGender } from './filterHelpers';

const patients = [
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
    gender: 'female',
    age: '35',
    id: '2',
    email: 'xyz@g.c',
    avatar: '',
  },
  {
    full_name: 'Alice',
    gender: 'Male',
    age: '45',
    id: '2',
    email: 'xyz@g.c',
    avatar: '',
  },
];
describe('filterByAge', () => {
  it('should return all patients when criteria is "All"', () => {
    const filteredPatients = filterByAge(patients, FilterByAge.ALL);
    expect(filteredPatients.length).toEqual(patients.length);
  });

  it('should return only patients within age range when criteria is in range', () => {
    const filteredPatients = filterByAge(patients, '30-50');
    expect(filteredPatients.length).toEqual(2);
    expect(filteredPatients[0].age).toEqual('35');
    expect(filteredPatients[1].age).toEqual('45');
  });

  it('should return only patients below age limit when criteria starts with "<"', () => {
    const filteredPatients = filterByAge(patients, '<40');
    expect(filteredPatients.length).toEqual(2);
    expect(filteredPatients[0].age).toEqual('25');
    expect(filteredPatients[1].age).toEqual('35');
  });

  it('should return only patients above age limit when criteria starts with ">"', () => {
    const filteredPatients = filterByAge(patients, '>40');
    expect(filteredPatients.length).toEqual(1);
    expect(filteredPatients[0].age).toEqual('45');
  });
});

describe('filterByGender', () => {
  it('should return all patients when criteria is "All"', () => {
    const filteredPatients = filterByGender(patients, FilterByGender.ALL);
    expect(filteredPatients.length).toEqual(patients.length);
  });

  it('should return only patients with matching gender when criteria is a gender', () => {
    const filteredPatients = filterByGender(patients, 'Male');
    expect(filteredPatients.length).toEqual(1);
    expect(filteredPatients[0].gender).toEqual('Male');
  });

  it('should return all patients when criteria is undefined', () => {
    const filteredPatients = filterByGender(patients);
    expect(filteredPatients.length).toEqual(patients.length);
  });
});
