import patients from '../../data/patients';
import { PatientEntry, PublicPatientEntry, Entry } from '../types';

const getPublicPatients = (): PublicPatientEntry[] =>
  patients.map(({ id, name, dateOfBirth, gender, occupation }) => ({
    id,
    name,
    dateOfBirth,
    gender,
    occupation
  }));
const getPatient = (id: string): PatientEntry | undefined => {
  const patient: PatientEntry | undefined = patients.find((p) => p.id === id);
  if (patient && !patient.entries) {
    return { ...patient, entries: [] };
  }
  return patient;
};
const createPatient = (patientObj: PatientEntry): PublicPatientEntry => {
  patients.push(patientObj);
  return {
    id: patientObj.id,
    name: patientObj.name,
    dateOfBirth: patientObj.dateOfBirth,
    gender: patientObj.gender,
    occupation: patientObj.occupation
  };
};
const createEntry = (patientId: PatientEntry['id'], entryObj: Entry): Entry => {
  const patientIndex: number = patients.findIndex(
    (patient) => patientId === patient.id
  );
  patients[patientIndex].entries.push(entryObj);
  return entryObj;
};
export default {
  getPublicPatients,
  createPatient,
  getPatient,
  createEntry
};
