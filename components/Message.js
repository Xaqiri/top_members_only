import styles  from '../styles/Message.module.css'
import React from 'react'

const Message = ({message}) => {
    return (
        <div className={styles.message}>
            <h1>{message.title}</h1>
            <h2>{message.body}</h2>
            <h4>Posted by: {message.user}</h4>
            <h4>At {message.timestamp}</h4>
        </div>
    )
}

export default Message