import { Diagnosis } from './types';

export const getDescriptionByCode = (
  code: string,
  diagnosesList: Diagnosis[]
): string => {
  const description = diagnosesList.find((diagnosis) => diagnosis.code === code)
    ?.name;
  return description ? description : 'No descriptoin';
};
