import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
  }
  const notification = useSelector((store) => store.notification.message)
  if (notification) {
    return <div style={style}>{notification}</div>
  }
  return null
}

export default Notification
