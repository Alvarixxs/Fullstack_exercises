function Filter({searchName, setSearchName}) {
  return (
    <div>
      <h2>Phonebook</h2>
      <div>
        filter shown with <input value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
      </div>
    </div>
  )
}

export default Filter