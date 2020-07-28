/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { PatientEntry, Gender, Entry } from './types';
import { v4 } from 'uuid';

const isString = (value: any): value is string => {
  return typeof value === 'string' || value instanceof String;
};
const isDate = (date: string): boolean => {
  return Boolean(Date.parse(date));
};
const isGender = (gender: any): gender is Gender => {
  return Object.values(Gender).includes(gender);
};

export const toNewEntry = (newEntry: any): Entry => {
  if (!newEntry.description || !newEntry.specialist) {
    throw new Error('Bad request');
  }
  const id = v4();

  switch (newEntry.type) {
    case 'Hospital':
      if (!newEntry.discharge.date || !newEntry.discharge.criteria) {
        throw new Error('No discharge');
      }

      return { ...newEntry, id } as Entry;
    case 'HealthCheck':
      if (!newEntry.healthCheckRating) {
        throw new Error('undefined healthcheckrating');
      }
      return { ...newEntry, id } as Entry;
    case 'OccupationalHealthcare':
      if (!newEntry.employerName) {
        throw new Error('undefined employer name');
      }
      return { ...newEntry, id } as Entry;
    default:
      throw new Error('Undefined entry type');
  }
};

export const toNewPatient = (newPatient: any): PatientEntry => {
  const parseName = (name: any): string => {
    if (!isString(name) || !name) {
      throw new Error('Incorrect or missing name');
    }
    return name;
  };
  const parseDateOfBirth = (date: any): string => {
    if (!date || !isString(date) || !isDate(date)) {
      throw new Error('Incorrect or missing date');
    }
    return date;
  };
  const parseOccupation = (occupation: any): string => {
    if (!occupation || !isString(occupation)) {
      throw new Error('Incorrect or missing occupation');
    }
    return occupation;
  };
  const parseSsn = (ssn: any): string => {
    if (!ssn || !isString(ssn)) {
      throw new Error('Incorrect or missing ssn');
    }
    return ssn;
  };
  const parseGender = (gender: any): Gender => {
    if (!gender || !isGender(gender)) {
      throw new Error('Missing or incorrect gender');
    }
    return gender;
  };
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  const newId: string = v4();
  return {
    id: newId,
    name: parseName(newPatient.name),
    dateOfBirth: parseDateOfBirth(newPatient.dateOfBirth),
    ssn: parseSsn(newPatient.ssn),
    gender: parseGender(newPatient.gender),
    occupation: parseOccupation(newPatient.occupation),
    entries: []
  };
};
