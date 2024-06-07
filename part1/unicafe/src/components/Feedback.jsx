
function Feedback({increaseGood, increaseNeutral, increaseBad}) {
  return (
    <section>
      <h1>give feedback</h1>
      <Button text="good" increase={increaseGood}></Button>
      <Button text="neutral" increase={increaseNeutral}></Button>
      <Button text="bad" increase={increaseBad}></Button>
    </section>
  )
}

function Button({text,increase}) {
  return (
    <button onClick={increase}>{text}</button>
  )
}

export default Feedback;