const Filter = ({ showName, handleFilterChange }) => {
    return (
      <div>
        filter shown with
        <input value={showName} onChange={handleFilterChange} />
      </div>
    )
}

export default Filter