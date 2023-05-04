import React from 'react'
import logo from '../assets/logo.png'

export default function Header()
{
    return (
        <div>
            <nav className="navbar bg-dark p-0">
                <div className="container d-flex justify-content-center">
                    <a className="navbar-brand p-0" href="/chars">
                        <img src={ logo.src } alt="Bootstrap" width={ "150px" } />
                    </a>
                </div>
            </nav>
        </div>
    )
}
