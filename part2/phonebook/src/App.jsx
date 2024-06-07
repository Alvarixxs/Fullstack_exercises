import {useEffect, useState} from 'react'
import Filter from "./components/Filter.jsx";
import NewName from "./components/NewName.jsx";
import Numbers from "./components/Numbers.jsx";
import personService from "./services/persons.js"

const App = () => {
  const [persons, setPersons] = useState([])
  const [newName, setNewName] = useState('')
  const [newNumber, setNewNumber] = useState('')
  const [message, setMessage] = useState(null)
  const [cl, setCl] = useState('')

  useEffect(() => {
    personService
      .getAll()
      .then(res => {setPersons(
        res.data)
      })
  }, []);

  function addPerson(e) {
    e.preventDefault()
    let person = persons.find((person) => person.name === newName)
    if (person !== undefined) {
      if (window.confirm(person.name + " is already added to phonebook, replace the old number with a new one?")) {
        personService
          .update(person.id, {name: person.name, number: newNumber, id: person.id})
          .then((res) => {
            setPersons(persons.map((person)=> {
              return {name: person.name, number: (person.id===res.data.id) ? res.data.number: person.number, id: person.id}
            }))
          })
          .catch(() => {
            setMessage("Information of " + person.name + " has already been removed from the server")
            setCl('error')
            setTimeout(() => {
              setMessage(null)
            }, 5000)
          })
      }
    }
    else {
      const person = {name: newName, number: newNumber}
      personService
        .create(person)
        .then(res => {
          setPersons(persons.concat(res.data))
          setNewName('')
          setNewNumber('')
          setMessage("Added " + person.name)
          setCl('success')
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
    }
  }

  function deletePerson(person) {
    if (window.confirm("Delete "+person.name + " ?")) {
      personService
        .remove(person.id)
        .then(res => {
          setPersons(persons.filter((person)=>person.id !== res.data.id))
        })
    }
  }

  const [searchName, setSearchName] = useState('')

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message} cl={cl} />
      <Filter searchName={searchName} setSearchName={setSearchName}></Filter>
      <NewName newName={newName} setNewName={setNewName} newNumber={newNumber} setNewNumber={setNewNumber}
               addPerson={addPerson}></NewName>
      <Numbers persons={persons} searchName={searchName} remove={deletePerson}></Numbers>
    </div>
  )
}

const Notification = ({ message, cl }) => {
  if (message === null) {
    return null
  }

  return (
    <div className={cl}>
      {message}
    </div>
  )
}

export default App