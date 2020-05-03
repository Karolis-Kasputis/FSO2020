import React from 'react'
import { useSelector } from 'react-redux'
import { Alert } from '@material-ui/lab'
const Notifications = () => {
  const notification = useSelector((store) => store.notification)

  if (!notification) {
    return null
  }
  if (notification.type === 'positive') {
    return <Alert severity='success'>{notification.message}</Alert>
  }
  if (notification.type === 'negative') {
    return <Alert severity='error'>{notification.message}</Alert>
  }
}

export default Notifications
