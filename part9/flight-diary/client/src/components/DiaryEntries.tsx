import {NonSensitiveDiaryEntry} from "../types.ts";

interface DiaryEntriesProps {
  entries: NonSensitiveDiaryEntry[]
}

function DiaryEntries(props: DiaryEntriesProps) {
  return (
    <div>
      <h2>Diary entries</h2>
      {props.entries.map(entry => (
        <DiaryEntryC key={entry.id} entry={entry} />
      ))}
    </div>
  )
}

interface DiaryEntryProps {
  entry: NonSensitiveDiaryEntry
}

function DiaryEntryC(props: DiaryEntryProps) {
  return (
    <div>
      <h3>{props.entry.date}</h3>
      <div>visibility: {props.entry.visibility}</div>
      <div>weather: {props.entry.weather}</div>
    </div>
  )
}

export default DiaryEntries;