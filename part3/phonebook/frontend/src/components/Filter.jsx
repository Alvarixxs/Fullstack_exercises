function Filter({searchName, setSearchName}) {
  return (
    <div>
      filter shown with <input value={searchName} onChange={(e) => setSearchName(e.target.value)}/>
    </div>
  )
}

export default Filter