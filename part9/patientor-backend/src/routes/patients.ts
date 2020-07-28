import express from 'express';
import patientsService from '../services/patientsService';
import { toNewPatient, toNewEntry } from '../utils';
const router = express.Router();
router.get('/', (_req, res) => {
  res.send(patientsService.getPublicPatients());
});
router.post('/', (req, res) => {
  const newPatient = toNewPatient(req.body);
  res.send(patientsService.createPatient(newPatient));
});
router.get('/:id', (req, res) => {
  const id = req.params.id;
  const patient = patientsService.getPatient(id);
  if (patient) {
    return res.send(patient);
  }
  return res.status(404).send('not found');
});
router.post('/:id/entries', (req, res) => {
  const id = req.params.id;
  const entry = patientsService.createEntry(id, toNewEntry(req.body));
  return res.status(200).send(entry);
});
export default router;
