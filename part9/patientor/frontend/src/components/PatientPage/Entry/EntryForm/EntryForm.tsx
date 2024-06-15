import React, {useState} from "react";
import {Button, MenuItem, OutlinedInput, Select, SelectChangeEvent, TextField} from "@mui/material";
import {Diagnosis, HealthCheckRating} from "../../../../types.ts";
import patientService from "../../../../services/patients";
import axios from "axios";
import {Entry} from "../../../../types.ts";

interface EntryFormProps {
  setMessage: (message: string) => void;
  diagnoses: Diagnosis[];
  patientId: string;
  addEntry: (entry: Entry) => void;
}

function EntryForm(props: EntryFormProps) {
  const [desc, setDesc] = useState('');
  const [type, setType] = useState('');
  const [date, setDate] = useState('');
  const [specialist, setSpecialist] = useState('');
  const [health, setHealth] = useState('');
  const [dischargeDate, setDischargeDate] = useState('');
  const [dischargeCriteria, setDischargeCriteria] = useState('');
  const [employer, setEmployer] = useState('');
  const [leaveStart, setLeaveStart] = useState('');
  const [leaveEnd, setLeaveEnd] = useState('');

  function handleSubmit(e: React.SyntheticEvent) {
    e.preventDefault();
    try {
      switch (type) {
        case "HealthCheck":
          patientService.createEntry(
            props.patientId,
            {
              description: desc,
              date,
              type,
              specialist,
              healthCheckRating: health as unknown as number as HealthCheckRating,
              diagnosisCodes: diagnosesCode
            }
          ).then((response) => {props.addEntry(response);});
          break;
        case "Hospital":
          patientService.createEntry(
            props.patientId,
            {
              description: desc,
              date,
              type,
              specialist,
              diagnosisCodes: diagnosesCode,
              discharge: {
                date: dischargeDate,
                criteria: dischargeCriteria
              }
            }
          ).then((response) => {props.addEntry(response);});
          break;
        case "OccupationalHealthcare":
          patientService.createEntry(
            props.patientId,
            {
              description: desc,
              date,
              type,
              specialist,
              diagnosisCodes: diagnosesCode,
              employerName: employer,
              sickLeave: {
                startDate: leaveStart,
                endDate: leaveEnd,
              }
            }
          ).then((response) => {props.addEntry(response);});
          break;
      }
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        props.setMessage(error.message);
      }
      {
        console.error(error);
      }
    }
    setDesc('');
    setDate('');
    setType('');
    setDiagnosisCode([]);
    setEmployer('');
    setLeaveEnd('');
    setLeaveStart('');
    setSpecialist('');
    setDischargeDate('');
    setDischargeCriteria('');
    setHealth('');
  }

  const [diagnosesCode, setDiagnosisCode] = React.useState<string[]>([]);

  const handleChange = (event: SelectChangeEvent<typeof diagnosesCode>) => {
    const {
      target: { value },
    } = event;
    setDiagnosisCode(
      // On autofill we get a stringified value.
      typeof value === 'string' ? value.split(',') : value,
    );
  };


  return (
    <form onSubmit={handleSubmit} style={{border: '1px solid black', borderRadius: '5px', padding: '5px'}}>
      <div>
        diagnose codes
        <Select
          multiple
          value={diagnosesCode}
          onChange={handleChange}
          input={<OutlinedInput label="Diagnoses codes" />}
        >
          {props.diagnoses.map((diagnose) => (
            <MenuItem key={diagnose.code} value={diagnose.code}>{diagnose.name}</MenuItem>
          ))}
        </Select>
      </div>
      <div>
        type
        <Select label="type" value={type} onChange={(e) => setType(e.target.value as string)}>
          <MenuItem value="HealthCheck">HealthCheck</MenuItem>
          <MenuItem value="Hospital">Hospital</MenuItem>
          <MenuItem value="OccupationalHealthcare">OccupationalHealthcare</MenuItem>
        </Select>
      </div>
      <div>
        <TextField type="text" value={desc} label="description" variant="filled" onChange={(e) => setDesc(e.target.value)}/>
      </div>
      <div>
        <TextField type="date" value={date} label="date" variant="filled" onChange={(e) => setDate(e.target.value)}/>
      </div>
      <div>
        <TextField type="text" value={specialist} label="specialist" variant="filled" onChange={(e) => setSpecialist(e.target.value)}/>
      </div>
      {type === "HealthCheck" ? (
        <div>
          health check rating
          <Select label="health check rating" value={health} onChange={(e) => setHealth(e.target.value as string)}>
            <MenuItem value="0">Healty</MenuItem>
            <MenuItem value="1 Risk">Low risk</MenuItem>
            <MenuItem value="2">high risk</MenuItem>
            <MenuItem value="3">critical risk</MenuItem>
          </Select>
          <div>
            <Button type="submit">add entry</Button>
          </div>
        </div>
      ) : type === "Hospital" ? (
        <div>
          <div>
            <TextField type="date" value={dischargeDate} label="discharge date" variant="filled"
                       onChange={(e) => setDischargeDate(e.target.value)}/>
          </div>
          <div>
            <TextField type="text" value={dischargeCriteria} label="discharge criteria" variant="filled"
                       onChange={(e) => setDischargeCriteria(e.target.value)}/>
          </div>
          <div>
            <Button type="submit">add entry</Button>
          </div>
        </div>
      ) : type === "OccupationalHealthcare" ? (
        <div>
          <div>
            <TextField type="text" value={employer} label="employer" variant="filled"
                       onChange={(e) => setEmployer(e.target.value)}/>
          </div>
          <div>
            <TextField type="date" value={leaveStart} label="sick leave start" variant="filled"
                       onChange={(e) => setLeaveStart(e.target.value)}/>
          </div>
          <div>
            <TextField type="date" value={leaveEnd} label="sick leave end" variant="filled"
                       onChange={(e) => setLeaveEnd(e.target.value)}/>
          </div>
          <div>
            <Button type="submit">add entry</Button>
          </div>
        </div>
      ) : null}
    </form>
  );
}

export default EntryForm;