import {useEffect, useState} from "react";
import {useMutation} from "@apollo/client";
import {EDIT_AUTHOR} from "../queries/queries.js";
import Select from 'react-select';

const Authors = (props) => {
  const [name, setName] = useState(null);
  const [born, setBorn] = useState('');
  const [ changeBirthdate, result ] = useMutation(EDIT_AUTHOR)

  const submit = async () => {
    await changeBirthdate({ variables: { name: name.value, setBornTo: parseInt(born) }})
    setName('')
    setBorn('')
  }

  useEffect(() => {
    if (result.data && result.data.editAuthor === null) {
      console.log('hello')
      props.setError('person not found')
    }
  }, [result.data])

  if (!props.show) {
    return null
  }

  const authors = props.authors;

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          name
          <Select defaultValue={name} onChange={setName} options={authors.map((author) => {return {value: author.name, label: author.name}})}></Select>
        </div>
        <div>
          born
          <input type="text" value={born} onChange={(e) => setBorn(e.target.value)}/>
        </div>
        <button type="submit">update author</button>
      </form>
    </div>
  )
}

export default Authors
