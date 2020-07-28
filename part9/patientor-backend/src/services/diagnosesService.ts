import diagnosesData from '../../data/diagnoses.json';
import { DiagnoseEntry } from '../types';

const diagnoses: DiagnoseEntry[] = diagnosesData as DiagnoseEntry[];

const getDiagnoses = (): DiagnoseEntry[] => diagnoses;

export default {
  getDiagnoses
};
