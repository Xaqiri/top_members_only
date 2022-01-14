import React from 'react'

const LogIn = () => {
    return (
        <main>
            <form action="" method="POST">
                <label htmlFor="username">Username: </label>
                <input type="text" name="username"></input>
                <label htmlFor="password">Password: </label>
                <input type="text" name="password"></input>
                <button>Submit</button>
            </form>
        </main>
    )
}

export default LogIn