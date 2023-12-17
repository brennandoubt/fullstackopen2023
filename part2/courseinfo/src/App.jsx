
const Part = ({ name, exercises }) => <p>{name} {exercises}</p>

const Content = ({ parts }) => {
  return (
    <div>
      {parts.map(part =>
        <Part key={part.id} name={part.name} exercises={part.exercises} />
      )}
    </div>
  )
}

const Header = ({ text }) => <h2>{text}</h2>

const Course = ({ course }) => {
  return (
    <div>
      <Header text={course.name} />
      <Content parts={course.parts} />
    </div>
  )
}

const App = () => {
  const course = {
    id: 1,
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10,
        id: 1
      },
      {
        name: 'Using props to pass data',
        exercises: 7,
        id: 2
      },
      {
        name: 'State of a component',
        exercises: 14,
        id: 3
      },
      {
        name: 'Redux',
        exercises: 11,
        id: 4
      }
    ]
  }

  /**
   * reduce "reduces" the array
   * to a single value (in this case the sum)
   */
  const total = course.parts.reduce(
    (s, p) => {
      console.log('whats happening', s, p);
      s += p.exercises
      return s
    },
    0
  )

  return (
    <div>
      <Course course={course} />
      <b>total of {total} exercises</b>
    </div>
  )
}

export default App