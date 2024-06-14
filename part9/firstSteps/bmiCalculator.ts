interface BmiValues {
    height: number,
    weight: number
}

export const parseArguments = (args: string[]): BmiValues => {
    if (args.length < 2) throw new Error('Not enough arguments');
    if (args.length > 2) throw new Error('Too many arguments');

    if (!isNaN(Number(args[0])) && !isNaN(Number(args[1]))) {
        return {
            height: Number(args[0]),
            weight: Number(args[1])
        }
    } else {
        throw new Error('Provided values were not numbers!');
    }
}

export const calculateBmi = (height: number, weight: number): string => {
    const heightcm = height / 100
    const bmi = weight / (heightcm*heightcm)

    if (bmi < 18.4) {
        return "underweight (severe thinness)"
    }
    else if (bmi >= 18.4 && bmi < 25) {
        return "normal range"
    }
    else {
        return "overweight or obese"
    }
}

try {
    const { height, weight } = parseArguments(process.argv);
    console.log(calculateBmi(height, weight));
} catch (error: unknown) {
    let errorMessage = 'Something bad happened.'
    if (error instanceof Error) {
        errorMessage += ' Error: ' + error.message;
    }
    console.log(errorMessage);
}