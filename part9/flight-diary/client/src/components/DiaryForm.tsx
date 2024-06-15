import React, {useState} from "react";
import {NewDiaryEntry, NonSensitiveDiaryEntry, Visibility, Weather} from "../types.ts";
import {createEntry} from "../diaryEntryService.ts";
import axios from "axios";

interface DiaryFormProps {
  diaryEntries: NonSensitiveDiaryEntry[],
  setDiaryEntries: React.Dispatch<React.SetStateAction<NonSensitiveDiaryEntry[]>>,
  message: string | null,
  setMessage: (message: string | null) => void
}

function DiaryForm(props: DiaryFormProps) {
  const {reset: resetDate, ...date} = useField('date')
  const {reset: resetComment, ...comment} = useField('text')
  const [visibility, setVisibility] = useState('')
  const [weather , setWeather] = useState('')

  const onSubmit = async (event: React.SyntheticEvent) => {
    event.preventDefault()

    try {
      const newDiaryEntry: NewDiaryEntry = {
        date: date.value,
        visibility: visibility as Visibility,
        weather: weather as Weather,
        comment: comment.value
      }

      createEntry(newDiaryEntry)
        .then(response => {
          props.setDiaryEntries(props.diaryEntries.concat({
            id: response.id,
            date: response.date,
            visibility: response.visibility,
            weather: response.weather
          }))
        })
    }
    catch (error) {
      if (axios.isAxiosError(error)) {
        props.setMessage(error.message)
      }
      {
        console.error(error)
      }
    }

    resetDate()
    resetComment()
  }

  return (
    <div>
      <h2>Add new entry</h2>
      {props.message ? <p style={{color: 'red'}}>{props.message}</p> : null}
      <form onSubmit={onSubmit}>
        <div><b>date</b> <input {...date}/></div>
        <div>
          <b>visibility</b>
          {Object.values(Visibility).map(v =>
            <div key={v}>{v}
              <input
                type="radio"
                name="visibility"
                value={v}
                onChange={(e) => setVisibility(e.target.value)}
              />
            </div>
          )}
        </div>
        <div>
          <b>weather</b>
          {Object.values(Weather).map(v =>
            <div key={v}>{v}
              <input
                type="radio"
                name="weather"
                value={v}
                onChange={(e) => setWeather(e.target.value)}
              />
            </div>
          )}
        </div>
        <div><b>comment</b> <input {...comment}/></div>
        <button type="submit">add</button>
      </form>
    </div>
  )
  
}

function useField(type: string) {
  const [value, setValue] = useState<string>('')

  function onChange(event: { target: { value: React.SetStateAction<string>; }; }) {
    setValue(event.target.value)
  }

  function reset() {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

export default DiaryForm