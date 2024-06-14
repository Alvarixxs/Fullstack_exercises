
const Books = ({allGenres, books, setFilter, show}) => {
  if (!show) {
    return null
  }

  return (
    <div>
      <h2>books</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div>
        {allGenres.map((genre) => <button key={genre} onClick={()=>setFilter(genre)}>{genre}</button>)}
        <button onClick={()=>setFilter('')}>all genres</button>
      </div>
    </div>
  )
}

export default Books
