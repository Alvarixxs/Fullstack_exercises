import Header from "./components/Header.tsx";
import Total from "./components/Total.tsx";
import Content from "./components/Content.tsx";
import {courseParts} from "./assets/courseParts.ts";

const App = () => {
  const courseName = "Half Stack application development";

  const totalExercises = courseParts.reduce((sum, part) => sum + part.exerciseCount, 0);

  return (
    <div>
      <Header courseName={courseName}></Header>
      <Content courseParts={courseParts}></Content>
      <Total totalExercises={totalExercises}></Total>
    </div>
  );
};

export default App;