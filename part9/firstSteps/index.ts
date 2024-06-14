import express = require('express');
import {calculateBmi, parseArguments} from "./bmiCalculator";
import {calculateExercises, parseArgumentsExercise} from "./exerciseCalculator";
const app = express();

app.use(express.json())

app.get('/bmi', (req, res) => {
  try {
    console.log(Object.values(req.query)  )
    // @ts-ignore
    const { height, weight } = parseArguments(Object.values(req.query));
    res.send({
      height,
      weight,
      bmi: calculateBmi(height, weight),
    })
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.send({
        error: error.message,
      })
    }
  }
});

app.post('/exercises', (req, res) => {
  const { daily_exercises, target } = req.body;
  console.log(req.body)
  try {
    const { target: targetS, dailyExercise: dailyExerciseS } = parseArgumentsExercise([...daily_exercises, target]);
    res.send(calculateExercises(dailyExerciseS, targetS));
  } catch (error: unknown) {
    if (error instanceof Error) {
      res.send({
        error: error.message,
      })
    }
  }
});

const PORT = 3003;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});