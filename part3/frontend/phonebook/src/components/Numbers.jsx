function Numbers({persons, searchName, remove}) {
  return (
    <div>
      <h2>Numbers</h2>
      {
        persons
        .filter((person)=>person.name.toLowerCase().includes(searchName.toLowerCase()))
        .map((person) => <Number key={person.id} person={person} remove={remove}></Number>)
      }
    </div>
  )
}

function Number({person, remove}) {
  return (
    <div>
      {person.name} {person.number} <button onClick={()=>remove(person)}>Delete</button>
    </div>
  )
}

export default Numbers;