import React, { useState } from 'react';
import { Grid, Button, Dropdown } from 'semantic-ui-react';
import { Formik, Form, Field, FormikProps } from 'formik';
import {
  Entry,
  HospitalEntry,
  OccupationalHealthcareEntry,
  HealthCheckEntry
} from '../types';
import {
  TextField,
  SelectField,
  DiagnosisSelection,
  healthRatingOptions,
  entryTypeOptions
} from '../AddPatientModal/FormField';
import { useStateValue } from '../state';

export type NewEntry = Omit<Entry, 'id'>;

interface Props {
  onSubmit: (values: NewEntry) => void;
  onCancel: () => void;
}

export const AddEntryForm: React.FC<Props> = ({ onSubmit, onCancel }) => {
  const [{ diagnoses }] = useStateValue();
  const type: Entry['type'] = 'HealthCheck';

  const fieldsHealthCheck = ({ type }: NewEntry) => {
    if (type === 'HealthCheck') {
      return (
        <SelectField
          label='Health rating'
          name='healthCheckRating'
          options={healthRatingOptions}
        />
      );
    }
  };

  const fieldsHospital = ({ type }: NewEntry) => {
    if (type === 'Hospital') {
      return (
        <>
          <Field
            label='Discharge date'
            placeholder='YYYY-MM-DD'
            name='discharge.date'
            component={TextField}
          />
          <Field
            label='Discharge criteria'
            placeholder='Discharge criteria'
            name='discharge.criteria'
            component={TextField}
          />
        </>
      );
    }
  };

  const fieldsOccupational = ({ type }: NewEntry) => {
    if (type === 'OccupationalHealthcare') {
      return (
        <>
          <Field
            label='Employer name'
            placeholder='Employer name'
            name='employerName'
            component={TextField}
          />
          <Field
            label='Sickleave start date'
            placeholder='YYYY-MM-DD'
            name='sickLeave.startDate'
            component={TextField}
          />
          <Field
            label='Sickleave end date'
            placeholder='YYYY-MM-DD'
            name='sickLeave.endDate'
            component={TextField}
          />
        </>
      );
    }
  };

  return (
    <div>
      <label>Entry type</label>
      <Formik
        initialValues={{
          type: type,
          description: '',
          date: '',
          specialist: '',
          diagnosisCodes: [],
          healthCheckRating: '0',
          discharge: { date: '', criteria: '' },
          employerName: '',
          sickLeave: { startDate: '', endDate: '' }
        }}
        onSubmit={onSubmit}
        validate={(values) => {
          const requiredError = 'Field is required';
          const errors: { [field: string]: string } = {};
          if (!values.description) {
            errors.description = requiredError;
          }
          if (!values.date) {
            errors.date = requiredError;
          }
          if (!values.specialist) {
            errors.specialist = requiredError;
          }
          return errors;
        }}
      >
        {({
          isValid,
          values,
          dirty,
          setFieldValue,
          setFieldTouched,
          setValues
        }) => {
          return (
            <Form className='form ui'>
              <SelectField
                name='type'
                label='type'
                options={entryTypeOptions}
              />

              <Field
                label='Specialist'
                placeholder='Specialist'
                name='specialist'
                component={TextField}
              />
              <Field
                label='Date'
                placeholder='YYYY-MM-DD'
                name='date'
                component={TextField}
              />
              <Field
                label='Description'
                placeholder='Description'
                name='description'
                component={TextField}
              />
              <DiagnosisSelection
                setFieldValue={setFieldValue}
                setFieldTouched={setFieldTouched}
                diagnoses={Object.values(diagnoses)}
              />
              {fieldsHealthCheck(values)}
              {fieldsHospital(values)}
              {fieldsOccupational(values)}
              {JSON.stringify(values.type)}
              <Grid>
                <Grid.Column floated='left' width={5}>
                  <Button type='button' onClick={onCancel} color='red'>
                    Cancel
                  </Button>
                </Grid.Column>
                <Grid.Column floated='right' width={5}>
                  <Button
                    type='submit'
                    floated='right'
                    color='green'
                    disabled={!dirty || !isValid}
                  >
                    Add
                  </Button>
                </Grid.Column>
              </Grid>
            </Form>
          );
        }}
      </Formik>
      <pre>{type}</pre>
    </div>
  );
};
