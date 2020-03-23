import React from 'react'

        const Header = (props) => ( 
            <h1>{props.course.name}</h1>
        )
        
        const Content = ({ course }) => {
        return (
            <div>
                {course.parts.map(part=><Part part={part} key={part.name}/>)}
                <Total course = {course}/>
            </div>
        )
        }
        const Total = ({ course }) => {
        
        const total = course.parts.reduce((sum, part) => sum + part.exercises, 0)
        
        return (
             <p>
                Total of  {total} exercises
             </p>
        )
        }

        const Part = (props) => (
            <p>
            {props.part.name} {props.part.exercises}
          </p>
        )
        
        const Course =({ course }) => {
        return (
            <div>
              <Header course ={course}/>
              <Content course ={course}/>
            </div>
          )
        }

        const Courses = ({courses}) => {
        return (
        <div>
          {courses.map(course => (
              <Course key={course.name} course={course} />
              )  
          )}
        </div>
        )
        }

export default Courses