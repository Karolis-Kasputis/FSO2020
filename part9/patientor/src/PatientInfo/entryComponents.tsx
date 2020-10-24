import React from 'react';
import { Card, List, Icon } from 'semantic-ui-react';
import { useStateValue } from '../state';
import {
  HealthCheckEntry,
  HospitalEntry,
  OccupationalHealthcareEntry
} from '../types';
import { getDescriptionByCode } from '../utils';
export const HospitalComp: React.FC<{ entry: HospitalEntry }> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  return (
    <Card fluid>
      <Card.Header as='h3'>
        <Icon name='hospital symbol' size='large' />
        {entry.date} - {entry.discharge.date}
      </Card.Header>
      <Card.Description>
        <div>
          Diagnosis:
          <List bulleted>
            {entry.diagnosisCodes?.map((code, i) => (
              <List.Item key={i}>
                {code} - {getDescriptionByCode(code, diagnoses)}
              </List.Item>
            ))}
          </List>
        </div>
        <div>Description: {entry.description}</div>
        <div>Discharge criteria: {entry.discharge.criteria}</div>
      </Card.Description>
    </Card>
  );
};
export const HealthCheckComp: React.FC<{ entry: HealthCheckEntry }> = ({
  entry
}) => {
  const [{ diagnoses }] = useStateValue();
  const condition = () => {
    switch (entry.healthCheckRating) {
      case '0':
        return (
          <>
            Healthy
            <Icon name='heart' size='large' color='green' />
          </>
        );
      case '1':
        return (
          <>
            Low risk
            <Icon name='heart' size='large' color='yellow' />
          </>
        );
      case '2':
        return (
          <>
            High risk
            <Icon name='heart' size='large' color='orange' />
          </>
        );
      case '3':
        return (
          <>
            Critical risk
            <Icon name='heart' size='large' color='red' />
          </>
        );
    }
  };
  return (
    <Card fluid>
      <Card.Header as='h3'>
        <Icon name='heart' size='large' />
        {entry.date}
      </Card.Header>
      <Card.Description>
        <div>
          Diagnosis:
          <List bulleted>
            {entry.diagnosisCodes?.map((code, i) => (
              <List.Item key={i}>
                {code} - {getDescriptionByCode(code, diagnoses)}
              </List.Item>
            ))}
          </List>
        </div>
        <div>Description: {entry.description}</div>
        <div>Health rating: {condition()}</div>
      </Card.Description>
    </Card>
  );
};
export const OccupationalHealthcareComp: React.FC<{
  entry: OccupationalHealthcareEntry;
}> = ({ entry }) => {
  const [{ diagnoses }] = useStateValue();
  const sickleave = () => {
    if (entry.sickLeave) {
      return (
        <div>
          Sickleave: {entry.sickLeave.startDate} - {entry.sickLeave.endDate}
        </div>
      );
    }
  };
  return (
    <Card fluid>
      <Card.Header as='h3'>
        <Icon name='stethoscope' size='large' />
        {entry.date} {entry.employerName}
      </Card.Header>
      <Card.Description>
        <div>
          Diagnosis:
          <List bulleted>
            {entry.diagnosisCodes?.map((code, i) => (
              <List.Item key={i}>
                {code} - {getDescriptionByCode(code, diagnoses)}
              </List.Item>
            ))}
          </List>
        </div>
        <div>Description: {entry.description}</div>
        {sickleave()}
      </Card.Description>
    </Card>
  );
};
