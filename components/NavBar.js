import Link from 'next/link'
import React from 'react'
import styles from '../styles/NavBar.module.css'

const NavBar = (props) => {
    return (
        <div className={styles.nav}>
            <div className={styles.nav_title}><Link href="/"><a>Home</a></Link></div>
            <div>
                <ul className={styles.nav_links}>
                    <li><Link href="/users/signup">Sign Up</Link></li>
                    <li><Link href="/users/login">Sign In</Link></li>
                </ul>
            </div>
        </div>
    )
}

export default NavBar