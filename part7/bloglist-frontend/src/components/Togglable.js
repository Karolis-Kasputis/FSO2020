import React, { useState, useImperativeHandle } from 'react'
import { Button } from '@material-ui/core'
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
        <Button variant='outlined' color='primary' onClick={() => toggleShow()}>
          {props.viewText}
        </Button>
      </div>
      <div style={showCancel} className='hiddenContent'>
        {props.children}
        <Button variant='outlined' color='primary' onClick={() => toggleShow()}>
          {props.hideText}
        </Button>
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
