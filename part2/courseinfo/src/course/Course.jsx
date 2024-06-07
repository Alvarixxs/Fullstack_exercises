import Header from "./Header.jsx";
import Content from "./Content.jsx";
import Total from "./Total.jsx";

function Course({courses}) {
  return (
    <div>
      {courses.map((course) => (
        <div key={course.id}>
          <Header course={course.name}></Header>
          <Content content={course.parts}></Content>
          <Total total={course.parts.reduce((accumulator, obj) => accumulator + obj.exercises, 0)}></Total>
        </div>
      ))}
    </div>
  )
}

export default Course;