import React, { useState, useImperativeHandle } from 'react'

import PropTypes from 'prop-types'

const Togglable = React.forwardRef((props, ref) => {
  const [show, setShow] = useState(false)
  const toggleShow = () => {
    setShow(!show)
  }
  const showToggle = { display: show ? 'none' : '' }
  const showCancel = { display: show ? '' : 'none' }

  useImperativeHandle(ref, () => {
    return {
      toggleShow,
    }
  })

  return (
    <div>
      <div style={showToggle}>
        <button onClick={() => toggleShow()}>{props.viewText}</button>
      </div>
      <div style={showCancel} className='hiddenContent'>
        {props.children}
        <button onClick={() => toggleShow()}>{props.hideText}</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  viewText: PropTypes.string.isRequired,
  hideText: PropTypes.string.isRequired,
}

Togglable.displayName = 'Togglable'

export default Togglable
