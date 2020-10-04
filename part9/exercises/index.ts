import express from 'express';
import { calculateBMI } from './bmiCalculator';
import { calculateExercises } from './exerciseCalculator';
const app = express();

app.use(express.json());
app.get('/hello', (_req, res) => {
  res.send('HELLO');
});

app.get('/bmi', (req, res) => {
  const height = Number(req.query.height);
  const weight = Number(req.query.weight);
  if (weight && height) {
    return res
      .status(200)
      .send(
        `According to BMI you are: ${calculateBMI(
          Number(req.query.height),
          Number(req.query.weight)
        )}`
      );
  }
  if (!weight || height) {
    return res.status(400).send({ error: 'malformatted parameters' });
  }
  return res.status(404);
});

app.post(
  '/exercises',
  (req: { body: { target: number; daily_exercises: Array<number> } }, res) => {
    const { target, daily_exercises } = req.body;
    const isArrayOfNumbers = (array: Array<string | number>): boolean => {
      const itemsAreNumbers: boolean[] = array.map((item: number) =>
        isNaN(item)
      );
      return !itemsAreNumbers.includes(true);
    };
    if (!target || !daily_exercises) {
      throw new Error('parameters missing');
    }
    if (isNaN(target) || !isArrayOfNumbers(daily_exercises))
      throw new Error('malformatted parameters');
    try {
      const result = calculateExercises(target, daily_exercises);
      res.status(200).json(result);
    } catch (err) {
      console.log('err', err);

      res.status(400).send({ error: err as string });
    }
  }
);

const PORT = 3001;
app.listen(PORT, () => console.log('server is running at', PORT));
