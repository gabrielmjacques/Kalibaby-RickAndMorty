import Link from 'next/link'

import styles from "../styles/Navbar.module.css"

export default function Navbar()
{
    return (
        <div>
            <nav className={ `navbar p-3 ${styles.navbar}` }>
                <div className="container d-flex justify-content-center">
                    <Link href={ "/listpage/1" } className="navbar-brand p-0">
                        <img src="/logo.png" alt="Rick and Morty logo" width={ '150px' } />
                    </Link>
                </div>
            </nav>
        </div >
    )
}
