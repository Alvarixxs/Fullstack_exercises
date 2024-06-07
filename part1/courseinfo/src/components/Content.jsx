
function Content({content}) {
  return (
    <div>
      <Part part={content[0].name} exercises={content[0].exercises}></Part>
      <Part part={content[1].name} exercises={content[1].exercises}></Part>
      <Part part={content[2].name} exercises={content[2].exercises}></Part>
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