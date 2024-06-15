import {DiagnoseEntry, Gender, HealthCheckRating, NewEntry, NewPatientEntry} from './types';

const isString = (text: unknown): text is string => {
  return typeof text === 'string' || text instanceof String;
};

const parseText = (text: unknown): string => {
  if (!isString(text)) {
    throw new Error('Incorrect or missing text');
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

export const toNewPatientEntry = (object: unknown): NewPatientEntry => {
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
      entries: []
    };
  }
  else {
    throw new Error('Incorrect data: some fields are missing');
  }
};

const parseDiagnosisCodes = (object: unknown): Array<DiagnoseEntry['code']> =>  {
  if (!object || typeof object !== 'object' || !('diagnosisCodes' in object)) {
    // we will just trust the data to be in correct form
    return [] as Array<DiagnoseEntry['code']>;
  }

  return object.diagnosisCodes as Array<DiagnoseEntry['code']>;
};

const isHealthCheckEntry = (param: number): param is HealthCheckRating => {
  return Object.values(HealthCheckRating).find((i) => i===param) !== undefined
}

const parseHealthCheckEntry = (entry: unknown): HealthCheckRating => {
  if (Number(entry) === undefined) {
    throw new Error('Incorrect or missing health check rating: ' + entry);
  }
  const num = Number(entry)
  if (!isHealthCheckEntry(num)) {
    throw new Error('Incorrect or missing health check rating: ' + entry);
  }

  return num;
};


export const toNewEntry = (object: unknown): NewEntry => {
  if (!object || typeof object !== 'object') {
    throw new Error('Incorrect or missing data');
  }

  if ('description' in object && 'date' in object && 'specialist' in object) {
    if ('type' in object) {
      switch (object.type) {
        case "HealthCheck":
          if ('healthCheckRating' in object) {
            return {
              description: parseText(object.description),
              date: parseDate(object.date),
              specialist: parseText(object.specialist),
              diagnosisCodes: parseDiagnosisCodes(object),
              type: "HealthCheck",
              healthCheckRating: parseHealthCheckEntry(object.healthCheckRating)
            }
          }
          break
        case "Hospital":
          if ('discharge' in object) {
            if (object.discharge && typeof object.discharge === 'object') {
              if ('date' in object.discharge && 'criteria' in object.discharge) {
                return {
                  description: parseText(object.description),
                  date: parseDate(object.date),
                  specialist: parseText(object.specialist),
                  diagnosisCodes: parseDiagnosisCodes(object),
                  type: "Hospital",
                  discharge: {
                    date: parseDate(object.discharge.date),
                    criteria: parseText(object.discharge.criteria)
                  }
                }
              }
            }
          }
          break
        case "OccupationalHealthcare":
          if ('employerName' in object) {
            if ('sickLeave' in object) {
              if (object.sickLeave && typeof object.sickLeave === 'object') {
                if ('startDate' in object.sickLeave && 'endDate' in object.sickLeave) {
                  return {
                    description: parseText(object.description),
                    date: parseDate(object.date),
                    specialist: parseText(object.specialist),
                    diagnosisCodes: parseDiagnosisCodes(object),
                    type: "OccupationalHealthcare",
                    employerName: parseText(object.employerName),
                    sickLeave: {
                      startDate: parseDate(object.sickLeave.startDate),
                      endDate: parseDate(object.sickLeave.endDate)
                    }
                  }
                }
              }
            } else {
              return {
                description: parseText(object.description),
                date: parseDate(object.date),
                specialist: parseText(object.specialist),
                diagnosisCodes: parseDiagnosisCodes(object),
                type: "OccupationalHealthcare",
                employerName: parseText(object.employerName),
              }
            }
          }
      }
    }
  }
  throw new Error('Incorrect data: some fields are missing');
}