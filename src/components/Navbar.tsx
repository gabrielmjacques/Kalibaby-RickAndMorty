import React from 'react'
import logo from '../assets/logo.png'

export default function Navbar()
{
    return (
        <div>
            <nav className="navbar p-0" style={ { backgroundColor: "#222831" } }>
                <div className="container d-flex justify-content-center">
                    <a className="navbar-brand p-0" href="/listpage/1">
                        <img src={ logo.src } alt="Bootstrap" width={ "150px" } />
                    </a>
                </div>
            </nav>
        </div>
    )
}
