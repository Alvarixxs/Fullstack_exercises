
function Content(props) {
  return (
    <div>
      <Part part={props.part1} exercises={props.exercises1}></Part>
      <Part part={props.part2} exercises={props.exercises2}></Part>
      <Part part={props.part3} exercises={props.exercises3}></Part>
    </div>
  )
}

function Part({part, exercises}) {
  return (
    <p>
      {part} {exercises}
    </p>
  )
}

export default Content