import DiaryEntries from "./components/DiaryEntries.tsx";
import {useEffect, useState} from "react";
import {NonSensitiveDiaryEntry} from "./types.ts";
import DiaryForm from "./components/DiaryForm.tsx";
import {getAllEntries} from "./diaryEntryService.ts";


function App() {
  const [diaryEntries, setDiaryEntries] = useState<NonSensitiveDiaryEntry[]>([]);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    getAllEntries().then(data => {
      setDiaryEntries(data)
    })
  }, [])

  return (
    <div>
      <DiaryForm diaryEntries={diaryEntries} setDiaryEntries={setDiaryEntries} message={message} setMessage={setMessage} />
      <DiaryEntries entries={diaryEntries}></DiaryEntries>
    </div>
  )
}

export default App
