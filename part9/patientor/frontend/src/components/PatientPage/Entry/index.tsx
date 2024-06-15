import {Diagnosis, Entry} from "../../../types.ts";
import FavoriteIcon from '@mui/icons-material/Favorite';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import MedicalInformationIcon from '@mui/icons-material/MedicalInformation';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

interface EntryProps {
  entry: Entry
  diagnoses: Diagnosis[],
}

function EntryC(props: EntryProps) {
  switch (props.entry.type) {
    case "HealthCheck":
      return (
        <BaseEntry {...props}>
          <LocalHospitalIcon />
          <FavoriteIcon style={{color: props.entry.healthCheckRating===3 ? 'red' : props.entry.healthCheckRating===2 ? 'yellow' : 'green'}}/>
        </BaseEntry>
      );
    case "Hospital":
      return (
        <BaseEntry {...props}>
          <MedicalInformationIcon/>
          <div>{`discharge(${props.entry.discharge.date}): ${props.entry.discharge.criteria}`}</div>
        </BaseEntry>
      );
    case "OccupationalHealthcare":
      return (
        <BaseEntry {...props}>
          <HealthAndSafetyIcon />
          <div>employed by {props.entry.employerName}</div>
          {props.entry.sickLeave ? (
            <div>sick leave: {props.entry.sickLeave.startDate} - {props.entry.sickLeave.endDate}</div>
          ) : <></>}
        </BaseEntry>
      );
    default:
      assertNever(props.entry);

  }
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

interface BaseEntryProps extends EntryProps {
  children: JSX.Element[] | JSX.Element;
}


function BaseEntry(props: BaseEntryProps) {
  function getName(code: string): string | undefined {
    const diagnosis = props.diagnoses.find((diagnosis) => diagnosis.code === code);
    return diagnosis?.name;
  }

  return (
    <div style={{border: '1px solid black', borderRadius: '5px', padding: '5px'}}>
      <div>{props.entry.date} <em>{props.entry.description}</em></div>
      <div>diagnose by {props.entry.specialist}</div>
      {props.children}
      <ul>
        {props?.entry?.diagnosisCodes?.map((diagnosisCode) => (
          <li key={diagnosisCode}>{diagnosisCode} {getName(diagnosisCode)}</li>
        ))}
      </ul>
    </div>
  );
}

export default EntryC;