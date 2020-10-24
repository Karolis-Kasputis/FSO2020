import React from 'react';
import { Entry } from '../types';
import {
  HospitalComp,
  HealthCheckComp,
  OccupationalHealthcareComp
} from './entryComponents';
const EntryDetails: React.FC<{ entry: Entry }> = ({ entry }) => {
  switch (entry.type) {
    case 'Hospital':
      return <HospitalComp entry={entry} />;
    case 'HealthCheck':
      return <HealthCheckComp entry={entry} />;
    case 'OccupationalHealthcare':
      return <OccupationalHealthcareComp entry={entry} />;
  }
};

export default EntryDetails;
