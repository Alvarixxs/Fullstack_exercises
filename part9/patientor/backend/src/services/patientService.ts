import patients from '../../data/patients';
import {v1 as uuid} from 'uuid'

import {Entry, NewEntry, NewPatientEntry, NonSensitivePatientEntry, PatientEntry} from "../types";

const getEntries = (): PatientEntry[] => {
  return patients;
};

const getNonSensitiveEntries = (): NonSensitivePatientEntry[] => {
  return patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation,
  }))
}

const addPatient = ( entry: NewPatientEntry ): PatientEntry => {
  const newPatientEntry = {
    id: uuid(),
    ...entry
  }

  patients.push(newPatientEntry);
  return newPatientEntry;
}

const findById = (id: string): PatientEntry | undefined => {
  return patients.find((patient) => patient.id === id);
}

const addEntry = (id: string, entry: NewEntry): Entry | undefined => {
  const newEntry = {
    id: uuid(),
    ...entry,
  }

  const patient = findById(id)
  if (patient) {
    patients.forEach((patient) => {
      if (patient.id === id) {
        patient.entries.push(newEntry)
      }
    })
    return newEntry
  }
  else {
    throw new Error("Couldn't find patient with matching id");
  }
}

export default {
  getEntries,
  getNonSensitiveEntries,
  addPatient,
  findById,
  addEntry
};