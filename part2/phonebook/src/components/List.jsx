const Person = ({ name, number }) => <div>{name} {number}</div>

const List = ({ personsToList }) => {
    return (
        <div>
        {personsToList.map(p => <Person key={p.id} name={p.name} number={p.number} />)}
        </div>
    )
}

export default List