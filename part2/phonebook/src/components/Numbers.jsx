function Numbers({persons, searchName}) {
  return (
    <div>
      <h2>Numbers</h2>
      {persons.filter((person)=>person.name.toLowerCase().includes(searchName.toLowerCase())).map((person) => <p key={person.id}>{person.name} {person.number}</p>)}
    </div>
  )
}

export default Numbers;