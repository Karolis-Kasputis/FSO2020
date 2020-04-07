import React from 'react'
const Notification = ({ notification, setNotification }) => {
    const negativeStyle= {
      color: 'red',
      fontStyle: 'bold',
      fontSize: '30px',
      backgroundColor: '#ffcccb',
      border: '3px solid red',
      borderRadius: '15px',
      padding: '10px',
      margin: '10px'
    }
  
    const positiveStyle= {
      color: 'green',
      fontStyle: 'bold',
      fontSize: '30px',
      backgroundColor: '#90ee90',
      border: '3px solid green',
      borderRadius: '15px',
      padding: '6px', 
      paddingLeft: '10px',
      margin: '10px'
    }
    if (notification === null)
      return <div></div>
    
    else if (notification.type === 'positive') 
      return <div style={positiveStyle}>{notification.message}</div>
      
    else if (notification.type === 'negative')
        return <div style={negativeStyle}>{notification.message}</div>
      
  
  }

export default Notification