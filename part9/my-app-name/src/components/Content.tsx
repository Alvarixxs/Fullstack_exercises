import Part from "./Part.tsx";
import {CoursePart} from "../assets/courseParts.ts";

interface ContentProps {
  courseParts: CoursePart[]
}

function Content(props: ContentProps) {
  return (
    <div>
      {props.courseParts.map((part) => <Part key={part.name} part={part} /> )}
    </div>
  )
}

export default Content;