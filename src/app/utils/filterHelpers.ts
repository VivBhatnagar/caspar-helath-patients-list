import { FilterByAge, FilterByGender } from 'src/globals';
import { Patient } from '../patient.modal';

export function filterByAge(patientsArray: Patient[], criteria: string) {
  return patientsArray.filter((item) => {
    if (criteria === FilterByAge.ALL) {
      return true;
    }
    let ageLimit;
    if (criteria.indexOf('-') > -1) {
      ageLimit = criteria.split('-');
      return ageLimit[0] < item['age'] && item['age'] < ageLimit[1];
    } else {
      ageLimit = criteria.slice(1);
      if (criteria.startsWith('<')) {
        return ageLimit > item['age'];
      } else {
        return ageLimit < item['age'];
      }
    }
  });
}

export function filterByGender(patientsArray: Patient[], criteria?: string) {
  if (!criteria) {
    return patientsArray;
  }
  return patientsArray.filter((item) =>
    criteria === FilterByGender.ALL ? true : criteria === item['gender']
  );
}
