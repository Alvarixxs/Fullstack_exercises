import {CoursePart} from "../assets/courseParts.ts";

interface PartProps {
  part: CoursePart;
}

function Part(props: PartProps) {
  switch (props.part.kind) {
    case "basic":
      return (
        <BasicPart part={props.part} >
          <div><em>{props.part.description}</em></div>
        </BasicPart>
      )
    case "group":
      return (
        <BasicPart part={props.part}>
          <div>project exercises {props.part.groupProjectCount}</div>
        </BasicPart>

      )
    case "background":
      return (
        <BasicPart part={props.part}>
          <div><em>{props.part.description}</em></div>
          <div>submit to: {props.part.backgroundMaterial}</div>
        </BasicPart>
      )
    case "special":
      return (
        <BasicPart part={props.part}>
          <div><em>{props.part.description}</em></div>
          <div>required skills: {props.part.requirements.map((requirement) => `${requirement}, `)}</div>
        </BasicPart>
      )
    default:
      return assertNever(props.part)
  }
}

interface BasicPartProps extends PartProps {
  children: JSX.Element[] | JSX.Element;
}

function BasicPart(props: BasicPartProps) {
  return (
    <div>
      <p><b>{props.part.name} {props.part.exerciseCount}</b></p>
      {props.children}
    </div>
  )
}

/**
 * Helper function for exhaustive type checking
 */
const assertNever = (value: never): never => {
  throw new Error(
    `Unhandled discriminated union member: ${JSON.stringify(value)}`
  );
};

export default Part;