
function Content({content}) {
  return (
    <div>
      {content.map((item) =><Part key={item.id} part={item.name} exercises={item.exercises}></Part>)}
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