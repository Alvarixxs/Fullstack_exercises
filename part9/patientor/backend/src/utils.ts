import {Gender, NewPatientEntry} from './types';

const toNewPatientEntry = (object: unknown): NewPatientEntry => {
  if ( !object || typeof object !== 'object' ) {
    throw new Error('Incorrect or missing data');
  }

  if ('name' in object && 'dateOfBirth' in object && 'ssn' in object && 'gender' in object && 'occupation' in object) {
    return {
      name: parseText(object.name),
      dateOfBirth: parseDate(object.dateOfBirth),
      ssn: parseText(object.ssn),
      gender: parseGender(object.gender),
      occupation: parseText(object.occupation),
    };
  }
  else {
    throw new Error('Incorrect data: some fields are missing');
  }
};

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseText = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('Incorrect or missing comment');
  }

  return text;
};

const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};

const parseDate = (date: unknown): string => {
  if (!isString(date) || !isDate(date)) {
    throw new Error('Incorrect or missing date: ' + date);
  }
  return date;
};

const isGender = (param: string): param is Gender => {
  return Object.values(Gender).map(v => v.toString()).includes(param)
}

const parseGender = (gender: unknown): Gender => {
  if (!isString(gender) || !isGender(gender)) {
    throw new Error('Incorrect or missing gender: ' + gender);
  }
  return gender;
};

export default toNewPatientEntry;