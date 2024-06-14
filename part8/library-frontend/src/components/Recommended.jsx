import {useEffect} from "react";

function Recommended({show, user, books, setFilter}) {
  useEffect(() => {
    console.log("mount");
    setFilter(user.favoriteGenre)
  }, [setFilter, user.favoriteGenre])

  if (!show) {
    return null
  }

  return (
    <div>
      <h2>recommendations</h2>
      <div>books in your favorite genre <b>{user.favoriteGenre}</b></div>
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
    </div>
  )
}

export default Recommended