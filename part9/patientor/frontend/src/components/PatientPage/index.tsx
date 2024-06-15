import {useEffect, useState} from "react";
import patientService from "../../services/patients.ts";
import {useParams} from "react-router-dom";
import {Diagnosis, Patient} from "../../types.ts";
import MaleIcon from '@mui/icons-material/Male';
import FemaleIcon from '@mui/icons-material/Female';
import TransgenderIcon from '@mui/icons-material/Transgender';
import EntryC from "./Entry";
import EntryForm from "./Entry/EntryForm/EntryForm.tsx";
import {Alert} from "@mui/material";
import {Entry} from "../../types.ts";

interface PatientPageProps {
  diagnoses: Diagnosis[];
}

function PatientPage(props: PatientPageProps) {
  const params = useParams();
  const [patient, setPatient] = useState<Patient | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(()  => {
    patientService.findById(params.id)
    .then(res => setPatient(res));
  }, [params]);

  if (!patient) {
    return (
      <div>No patient found.</div>
    );
  }

  const addEntry = (entry: Entry) => {
    const newPatient: Patient = {...patient};
    newPatient.entries.push(entry);
    setPatient(newPatient);
  };

  return (
    <div>
      <h2>
        {patient.name}
        {patient.gender === 'male' ? (
          <MaleIcon></MaleIcon>
        ) : patient.gender === 'female' ? (
          <FemaleIcon></FemaleIcon>
        ) : (
          <TransgenderIcon></TransgenderIcon>
        )}
      </h2>

      <div>ssh: {patient.ssn}</div>
      <div>occupation: {patient.occupation}</div>
      <h3>entries</h3>
      {message ? <Alert style={{color: 'red'}}>{message}</Alert>: null}
      <EntryForm setMessage={setMessage} diagnoses={props.diagnoses} patientId={patient.id} addEntry={addEntry}></EntryForm>
      {patient.entries.map((entry) => <EntryC key={entry.id} entry={entry} diagnoses={props.diagnoses}/>)}
    </div>
  );
}

export default PatientPage;