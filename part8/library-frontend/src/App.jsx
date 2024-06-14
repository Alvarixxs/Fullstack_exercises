import {useEffect, useState} from "react";
import Authors from "./components/Authors";
import Books from "./components/Books";
import NewBook from "./components/NewBook";

import {useQuery, useSubscription, useApolloClient} from '@apollo/client'
import {ALL_AUTHORS, BOOK_ADDED, FILTER_BOOKS, ME} from "./queries.js";
import LoginForm from "./components/LoginForm.jsx";
import Recommended from "./components/Recommended.jsx";

const App = () => {
  const [page, setPage] = useState("authors");
  const [filter, setFilter] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [token, setToken] = useState(null)
  const client = useApolloClient()
  const [allGenres, setAllGenres] = useState([])

  const resultUser = useQuery(ME)
  const resultAuthors = useQuery(ALL_AUTHORS)
  const resultFilterBooks = useQuery(FILTER_BOOKS, {
    variables: {genre: filter},
  })

  useEffect(() => {
    const token = localStorage.getItem('library-user-token')
    if (token) {
      setToken(token)
    }
  }, []);

  useSubscription(BOOK_ADDED, {
    onData: ({ data, client }) => {
      const addedBook = data.data.bookAdded
      notify(`${addedBook.title} added`)
      client.resetStore()
    }
  })

  useEffect(() => {
    if (filter==='') {
      const books = resultFilterBooks?.data?.allBooks
      let genres = []
      books?.forEach(book => {
        genres.push(...book.genres)
      })
      setAllGenres([...new Set(genres)])
    }
  }, [filter, resultFilterBooks?.data?.allBooks]);

  if (resultAuthors.loading || resultFilterBooks.loading) {
    return <div>loading...</div>
  }

  const books = resultFilterBooks?.data?.allBooks

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 10000)
  }

  const logout = async () => {
    setToken(null)
    localStorage.clear()
    await client.resetStore()
  }

  return (
    <div>
      <Notify errorMessage={errorMessage} />
        {!token ? (
          <div>
            <button onClick={() => setPage("authors")}>authors</button>
            <button onClick={() => setPage("books")}>books</button>
            <button onClick={() => setPage("login")}>login</button>
          </div>
        ) : (
          <div>
            <button onClick={() => setPage("authors")}>authors</button>
            <button onClick={() => setPage("books")}>books</button>
            <button onClick={() => setPage("add")}>add book</button>
            <button onClick={()=>setPage("recommended")}>recommended</button>
            <button onClick={logout}>logout</button>
          </div>
        )}

      <Authors show={page === "authors"} authors={resultAuthors.data.allAuthors} setError={notify} token={token}/>

      {page === "books" ? (
        <Books show={page === "books"} books={books} allGenres={allGenres} setFilter={setFilter}/>
      ) : null}
      <NewBook show={page === "add"} setError={notify}/>

      <LoginForm show={page === "login"} setError={notify} setToken={setToken} setPage={setPage}/>

      {page === "recommended" ? (
      <Recommended show={page === "recommended"} books={books} user={resultUser.data.me}
                    setFilter={setFilter} />
        ) : null
      }
    </div>
  );
};

const Notify = ({errorMessage}) => {
  if ( !errorMessage ) {
    return null
  }
  return (
    <div style={{color: 'red'}}>
      {errorMessage}
    </div>
  )
}

export default App;
