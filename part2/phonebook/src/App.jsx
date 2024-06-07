import {useEffect, useState} from 'react'
import Filter from "./Filter.jsx";
import NewName from "./NewName.jsx";
import Numbers from "./components/Numbers.jsx";
import axios from "axios";

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')

  useEffect(() => {
    axios.get('http://localhost:3001/persons').then(res => {setPersons(res.data)})
  }, []);

  function addPerson(e) {
    e.preventDefault()
    if (persons.find((person) => person.name === newName) !== undefined) {
      alert(newName+ " is already added to phonebook")
    }
    else {
      setPersons(persons.concat({name: newName, number: newNumber, id: persons.length+1}))
    }
  }

  const [searchName, setSearchName] = useState('')

  return (
    <div>
      <Filter searchName={searchName} setSearchName={setSearchName}></Filter>
      <NewName newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber} addPerson={addPerson}></NewName>
      <Numbers persons={persons} searchName={searchName}></Numbers>
    </div>
  )
}

export default App