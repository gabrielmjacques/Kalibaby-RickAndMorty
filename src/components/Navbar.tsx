import React from 'react'
import logo from '../assets/logo.png'
import Link from 'next/link'

export default function Navbar()
{
    return (
        <div>
            <nav className="navbar p-0" style={ { backgroundColor: "#222831" } }>
                <div className="container d-flex justify-content-center">
                    <Link href={ "/listpage/1" } className="navbar-brand p-0">
                        <img src={ logo.src } alt="Bootstrap" width={ "150px" } />
                    </Link>
                </div>
            </nav>
        </div>
    )
}
