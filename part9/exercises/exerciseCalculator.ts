interface Result {
  periodLength: number;
  trainingDays: number;
  success: boolean;
  rating: number;
  ratingDescription: string;
  target: number;
  average: number;
}

export const calculateExercises = (
  target: number,
  days: Array<number>
): Result => {
  if (isNaN(target) || days.includes(NaN)) {
    throw new Error(
      'BAD INPUT! The first argument is a target(number) and consecutive arguments are day hours of training(numbers)'
    );
  }
  const average = days.reduce((acc, cur) => acc + cur, 0) / days.length;
  const rating = () => {
    if (average > target * 1.1) {
      return { rating: 3, description: 'PERFECT, YOU BEAT THE RECORD' };
    }
    if (average > target * 0.9) {
      return { rating: 2, description: 'not too bad but could be better' };
    }
    if (average < target * 0.9) {
      return { rating: 3, description: 'IS THAT ALL THAT UVE GOT???' };
    }
    throw new Error('something rooong');
  };

  return {
    periodLength: days.length,
    trainingDays: days.filter((day) => day !== 0).length,
    average,
    target,
    success: average > target,
    rating: rating().rating,
    ratingDescription: rating().description
  };
};
