import React from 'react';
interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CourseWithDescription extends CoursePartBase {
  description?: string;
}

interface CoursePartOne extends CourseWithDescription {
  name: 'Fundamentals';
}

interface CoursePartTwo extends CoursePartBase {
  name: 'Using props to pass data';
  groupProjectCount: number;
}

interface CoursePartThree extends CourseWithDescription {
  name: 'Deeper type usage';
  exerciseSubmissionLink: string;
}

interface CoursePartFour extends CourseWithDescription {
  name: 'This a fourth course';
  isItReally: string;
}

type CoursePart =
  | CoursePartOne
  | CoursePartTwo
  | CoursePartThree
  | CoursePartFour;

const Header: React.FC<{ name: string }> = ({ name }) => {
  return <h1>{name}</h1>;
};
const Content: React.FC<{ parts: CoursePart[] }> = ({ parts }) => (
  <div>
    {parts.map((part) => (
      <Part part={part} />
    ))}
  </div>
);

const Part: React.FC<{ part: CoursePart }> = ({ part }) => {
  const assertNever = (value: never): never => {
    throw new Error('unhandled discrimination union member');
  };

  switch (part.name) {
    case 'Fundamentals':
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <li>description: {part.description}</li>
        </div>
      );
    case 'Using props to pass data':
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <li>group project count: {part.groupProjectCount}</li>
        </div>
      );
    case 'Deeper type usage':
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <li>Exercise submission link: {part.exerciseSubmissionLink}</li>
        </div>
      );
    case 'This a fourth course':
      return (
        <div>
          <p>
            {part.name} {part.exerciseCount}
          </p>
          <li>Really?: {part.isItReally}</li>
        </div>
      );
    default:
      return assertNever(part);
  }
};

const Total: React.FC<{ parts: CoursePart[] }> = ({ parts }) => {
  return (
    <p>
      Number of exercises{' '}
      {parts.reduce((carry, part) => carry + part.exerciseCount, 0)}
    </p>
  );
};
const App: React.FC = () => {
  const courseName = 'Half Stack application development';
  const courseParts: CoursePart[] = [
    {
      name: 'Fundamentals',
      exerciseCount: 10,
      description: 'This is an awesome course part'
    },
    {
      name: 'Using props to pass data',
      exerciseCount: 7,
      groupProjectCount: 3
    },
    {
      name: 'Deeper type usage',
      exerciseCount: 14,
      description: 'Confusing description',
      exerciseSubmissionLink: 'https://fake-exercise-submit.made-up-url.dev'
    },
    {
      name: 'This a fourth course',
      exerciseCount: 1,
      description: 'LAST ONE',
      isItReally: 'YES RELALY'
    }
  ];

  return (
    <div>
      <Header name={courseName} />
      <Content parts={courseParts} />
      <Total parts={courseParts} />
    </div>
  );
};

export default App;
