import React from 'react'

const Filter = ({ search, handleSearch }) => {
    return (
      <form>
          <div>
            search: <input value={search} onChange={handleSearch} />
          </div>
        </form>
    )
  
  }

  export default Filter