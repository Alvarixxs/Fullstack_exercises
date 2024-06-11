import App from "../App.jsx";
import AnecdoteList from "../components/AnecdoteList.jsx";
import CreateNew from "../components/CreateNew.jsx";
import About from "../components/About.jsx";
import Anecdote from "../components/Anecdote.jsx";

const routes = [
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/anecdotes", element: <AnecdoteList /> },
      { path: "anecdotes/:id", element: <Anecdote /> },
      { path: "create", element: <CreateNew /> },
      { path: "about", element: <About /> },
    ]
  }
]

export default routes