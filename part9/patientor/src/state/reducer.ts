import { State } from './state';
import { Patient, Diagnosis, Entry } from '../types';

export type Action =
  | {
      type: 'SET_PATIENT_LIST';
      payload: Patient[];
    }
  | {
      type: 'ADD_PATIENT';
      payload: Patient;
    }
  | {
      type: 'UPDATE_PATIENT';
      payload: Patient;
    }
  | {
      type: 'UPDATE_DIAGNOSES';
      payload: Diagnosis[];
    }
  | {
      type: 'ADD_ENTRY';
      payload: { id: string; entry: Entry };
    };

export const setPatientList = (list: Patient[]): Action => {
  return {
    type: 'SET_PATIENT_LIST',
    payload: list
  };
};

export const updatePatient = (patient: Patient): Action => {
  return { type: 'UPDATE_PATIENT', payload: patient };
};
export const updateDiagnoses = (diagnoses: Diagnosis[]): Action => {
  return { type: 'UPDATE_DIAGNOSES', payload: diagnoses };
};
export const addPatient = (patient: Patient): Action => {
  return { type: 'ADD_PATIENT', payload: patient };
};
export const addEntry = (entry: { id: string; entry: Entry }): Action => {
  return { type: 'ADD_ENTRY', payload: entry };
};
export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case 'SET_PATIENT_LIST':
      return {
        ...state,
        patients: {
          ...action.payload.reduce(
            (memo, patient) => ({ ...memo, [patient.id]: patient }),
            {}
          ),
          ...state.patients
        }
      };
    case 'ADD_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'UPDATE_PATIENT':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: action.payload
        }
      };
    case 'UPDATE_DIAGNOSES':
      return {
        ...state,
        diagnoses: [...action.payload]
      };
    case 'ADD_ENTRY':
      return {
        ...state,
        patients: {
          ...state.patients,
          [action.payload.id]: {
            ...state.patients[action.payload.id],
            entries: [
              ...state.patients[action.payload.id].entries,
              action.payload.entry
            ]
          }
        }
      };
    default:
      return state;
  }
};
