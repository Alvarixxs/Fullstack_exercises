import Feedback from "./components/Feedback.jsx";
import {useState} from "react";
import Statistics from "./components/Statistics.jsx";

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  function increaseGood() {
    setGood(good + 1);
  }

  function increaseNeutral() {
    setNeutral(neutral + 1);
  }

  function increaseBad() {
    setBad(bad + 1);
  }

  return (
    <main>
      <Feedback increaseGood={increaseGood} increaseNeutral={increaseNeutral} increaseBad={increaseBad}></Feedback>
      <Statistics good={good} neutral={neutral} bad={bad}></Statistics>
    </main>
  )
}

export default App
