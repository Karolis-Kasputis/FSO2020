import React, { useState } from 'react';
import { Header, List, Icon, Button } from 'semantic-ui-react';
import { useParams } from 'react-router-dom';
import {
  useStateValue,
  updatePatient,
  updateDiagnoses,
  addEntry
} from '../state';
import { apiBaseUrl } from '../constants';
import EntryDetails from './EntryDetails';
import AddEntryModal from '../AddEntryModal';
import { NewEntry } from '../AddEntryModal/AddEntryForm';
import axios from 'axios';
import { Patient, Diagnosis, Entry } from '../types';

const PatientInfo: React.FC = () => {
  const [{ patients, diagnoses }, dispatch] = useStateValue();
  const { id } = useParams<{ id: string }>();
  const patient = patients[id];
  const [modalOpen, setModalOpen] = useState<boolean>(false);

  const openModal = (): void => setModalOpen(true);
  const closeModal = (): void => setModalOpen(false);
  const submitNewEntry = async (values: NewEntry) => {
    const { data: newEntry } = await axios.post<Entry>(
      `${apiBaseUrl}/patients/${id}/entries`,
      values
    );
    const updateEntryObj: { id: string; entry: Entry } = {
      id,
      entry: newEntry
    };
    dispatch(addEntry(updateEntryObj));
    closeModal();
  };
  React.useEffect(() => {
    const fetchPatient = async () => {
      try {
        const { data: patient } = await axios.get<Patient>(
          `${apiBaseUrl}/patients/${id}`
        );
        dispatch(updatePatient(patient));
      } catch (error) {
        throw new Error('Error fetching patients');
      }
    };
    const patientIsDetailedInStore = (): boolean => {
      if (
        patient &&
        patient.hasOwnProperty('ssn') &&
        patient.hasOwnProperty('entries')
      ) {
        return true;
      }
      return false;
    };

    const fetchDiagnoses = async () => {
      try {
        const { data: diagnoses } = await axios.get<Diagnosis[]>(
          `${apiBaseUrl}/diagnoses`
        );
        dispatch(updateDiagnoses(diagnoses));
      } catch (err) {
        console.log(err);
        throw new Error('Error fetching diagnoses');
      }
    };
    if (!patientIsDetailedInStore()) {
      fetchPatient();
      fetchDiagnoses();
    } // eslint-disable-next-line
  }, [dispatch]);

  if (!patient || !diagnoses) {
    return <Header size='medium'>Loading...</Header>;
  }

  return (
    <div>
      <Header size='medium'>
        {patient.name}
        {patient.gender === 'male' ? (
          <Icon name='mars' />
        ) : (
          <Icon name='venus' />
        )}
      </Header>
      <List>
        <List.Item>SSN: {patient.ssn}</List.Item>
        <List.Item>Occupation: {patient.occupation}</List.Item>
      </List>
      {patient.entries?.map((entry, i) => (
        <EntryDetails key={i} entry={entry} />
      ))}
      <AddEntryModal
        modalOpen={modalOpen}
        closeModal={() => closeModal()}
        onSubmit={submitNewEntry}
      />
      <Button onClick={() => openModal()}> Add new entry </Button>
    </div>
  );
};
export default PatientInfo;
