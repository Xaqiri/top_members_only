import React from 'react'

const SignUp = () => {
    const handleSubmit = (e) => {
        e.preventDefault();
        const newUser = {
            "first_name": e.target.firstname.value,
            "last_name": e.target.lastname.value,
            "username": e.target.username.value,
            "password": e.target.password.value
        }
        fetch('http://localhost:3000/api/signup', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(newUser),
        }).then(res => {
            if (res.status === 400) console.log('Username already exists')
        })
    }
    
    return (
        <main>
            <form onSubmit={handleSubmit}>
                <label htmlFor="firstname">First Name: </label>
                <input type="text" name="firstname"></input>
                <label htmlFor="lastname">Last Name: </label>
                <input type="text" name="lastname"></input>
                <label htmlFor="username">Username: </label>
                <input type="text" name="username"></input>
                <label htmlFor="password">Password: </label>
                <input type="text" name="password"></input>
                <button type="submit">Submit</button>
            </form>
        </main>
    )
}

export default SignUp