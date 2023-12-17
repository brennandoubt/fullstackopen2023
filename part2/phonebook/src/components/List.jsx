
const Button = ({ text, handler }) => <button onClick={handler}>{text}</button> 
const Person = ({ name, number, deletePerson }) => <div>{name} {number} <Button text='delete' handler={deletePerson} /></div>

const List = ({ personsToList }) => {
    return (
        <div>
        {personsToList.map(p => <Person key={p.id} name={p.name} number={p.number} />)}
        </div>
    )
}

export default List