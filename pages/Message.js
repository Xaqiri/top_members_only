import React from 'react'
const Message = ({message}) => {
    return (
        <div>
            <h1>{message.title}</h1>
            <h1>{message.body}</h1>
            <h1>{message.user}</h1>
            <h1>{message.timestamp}</h1>
        </div>
    )
}

export default Message