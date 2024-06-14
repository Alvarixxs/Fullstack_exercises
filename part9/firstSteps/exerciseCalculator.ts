
interface Result {
  days: number,
  trainingDays: number,
  target: number,
  avgTime: number,
  reached: boolean,
  rating: number,
  explanation: string
}

interface ExerciseValues {
  dailyExercise: number[],
  target: number
}

const allNumber = (args: string[]) : boolean => {
  // @ts-ignore
  args.forEach((arg) => {
    if (isNaN(Number(arg))) {
      return false
    }
  })
  return true
}

export const parseArgumentsExercise = (args: string[]): ExerciseValues => {
  if (args.length < 4) throw new Error('Not enough arguments');

  if (allNumber(args.splice(0,1))) {
    let numbers = args.map(arg => Number(arg));
    numbers.splice(0,2)
    return {
      target: Number(args[1]),
      dailyExercise: numbers
    }
  } else {
    throw new Error('Provided values were not numbers!');
  }
}

export const calculateExercises = (dailyExercise: number[], target: number): Result => {
  const avgTime: number = dailyExercise.reduce((acc, current) => acc += current, 0) / dailyExercise.length;

  return {
    days: dailyExercise.length,
    trainingDays: dailyExercise.reduce((acc, current) => current !== 0 ? acc + 1 : acc, 0),
    target:  target,
    avgTime: avgTime,
    reached: avgTime >= target,
    rating: avgTime >= target ?
      3 : target - avgTime <= 1 ?
        2 : 1,
    explanation: avgTime >= target ?
      "good" : target - avgTime <= 1 ?
        "decent" : "bad"
  }
}

try {
  const { target, dailyExercise } = parseArgumentsExercise(process.argv);
  console.log(calculateExercises(dailyExercise, target));
} catch (error: unknown) {
  let errorMessage = 'Something bad happened.'
  if (error instanceof Error) {
    errorMessage += ' Error: ' + error.message;
  }
  console.log(errorMessage);
}