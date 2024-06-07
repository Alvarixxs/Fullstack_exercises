
function Statistics({good,neutral,bad}) {
  const total = good+neutral+bad
  return (
    (good + neutral + bad !== 0) ? (
      <section>
        <h1>statistics</h1>
        <table>
          <tbody>
          <StatisticLine text="good" statistic={good}></StatisticLine>
          <StatisticLine text="neutral" statistic={neutral}></StatisticLine>
          <StatisticLine text="bad" statistic={bad}></StatisticLine>
          <StatisticLine text="average" statistic={(good + bad * (-1)) / total}></StatisticLine>
          <StatisticLine text="positive" statistic={good/total}></StatisticLine>
          </tbody>
        </table>
      </section>
    ) : (
      <p>No feedback given</p>
    )
  )
}

function StatisticLine({text,statistic}) {
  return (
    <tr>
      <td>{text} {statistic}</td>
    </tr>
  )
}

export default Statistics