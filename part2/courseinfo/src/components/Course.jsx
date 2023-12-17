
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
    /**
     * reduce "reduces" the array
     * to a single value (in this case the sum)
     */
    const total = course.parts.reduce(
      (s, p) => {
        s += p.exercises
        return s
      },
      0
    )
  
    return (
      <div>
        <Header text={course.name} />
        <Content parts={course.parts} />
        <b>total of {total} exercises</b>
      </div>
    )
}

export default Course