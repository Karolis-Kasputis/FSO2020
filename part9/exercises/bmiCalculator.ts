export const calculateBMI = (height: number, weight: number): string => {
  if (!height || !weight) {
    throw new Error('bad input!');
  }
  const bmi = (weight / (height * height)) * 10000;
  if (bmi < 18.5) {
    return 'Underweight';
  }
  if (bmi < 25) {
    return 'Normal weight';
  }
  if (bmi < 30) {
    return 'Overweight';
  }
  return 'Obese';
};
