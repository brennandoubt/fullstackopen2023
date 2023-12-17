
const Button = ({ id, text, handler }) => <button id={id} onClick={handler}>{text}</button> 
const Person = ({ id, name, number, deletePerson }) => <div>{name} {number} <Button id={id} text='delete' handler={deletePerson} /></div>

const List = ({ personsToList, handleDeleteClick }) => {
    return (
        <div>
        {personsToList.map(p => <Person key={p.id} id={p.id} name={p.name} number={p.number} deletePerson={handleDeleteClick} />)}
        </div>
    )
}

export default List