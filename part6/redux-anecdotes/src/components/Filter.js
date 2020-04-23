import React from 'react'
import { filterCreator } from '../reducers/filterReducer'
import { connect } from 'react-redux'

const Filter = ({ filterCreator }) => {
  const handleChange = (event) => {
    filterCreator(event.target.value)
  }
  const style = {
    marginBottom: 10,
  }

  return (
    <div style={style}>
      filter <input onChange={handleChange} />
    </div>
  )
}
const mapDispatchToProps = (dispatch) => {
  return {
    filterCreator: (value) => dispatch(filterCreator(value)),
  }
}

export default connect(null, mapDispatchToProps)(Filter)
