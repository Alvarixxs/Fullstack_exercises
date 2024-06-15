
export interface DiagnoseEntry {
  code: string,
  name: string,
  latin?: string
}

export interface DischargeEntry {
  date: string,
  criteria: string,
}

export interface SickLeaveEntry {
  startDate: string,
  endDate: string,
}


export enum HealthCheckRating {
  "Healthy" = 0,
  "LowRisk" = 1,
  "HighRisk" = 2,
  "CriticalRisk" = 3
}

interface BaseEntry {
  id: string;
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

interface HealthCheckEntry extends BaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface HospitalEntry extends BaseEntry {
  type: "Hospital",
  discharge: DischargeEntry
}

interface OccupationalHealthcareEntry extends BaseEntry {
  type: "OccupationalHealthcare";
  employerName: string,
  sickLeave?: SickLeaveEntry
}

export type Entry =
  | HospitalEntry
  | OccupationalHealthcareEntry
  | HealthCheckEntry;

export interface PatientEntry {
  id: string,
  name: string,
  dateOfBirth: string,
  ssn: string,
  gender: Gender,
  occupation: string,
  entries: Entry[]
}

export enum Gender {
  Male = 'male',
  Female = 'female',
  Other = 'other',
}

export type NonSensitivePatientEntry = Omit<PatientEntry, 'ssn' | 'entries'>;

export type NewPatientEntry = Omit<PatientEntry, 'id'>;

interface NewBaseEntry {
  description: string;
  date: string;
  specialist: string;
  diagnosisCodes?: Array<DiagnoseEntry['code']>;
}

interface NewHealthCheckEntry extends NewBaseEntry {
  type: "HealthCheck";
  healthCheckRating: HealthCheckRating;
}

interface NewHospitalEntry extends NewBaseEntry {
  type: "Hospital",
  discharge: DischargeEntry
}

interface NewOccupationalHealthcareEntry extends NewBaseEntry {
  type: "OccupationalHealthcare";
  employerName: string,
  sickLeave?: SickLeaveEntry
}

export type NewEntry =NewHealthCheckEntry | NewHospitalEntry | NewOccupationalHealthcareEntry