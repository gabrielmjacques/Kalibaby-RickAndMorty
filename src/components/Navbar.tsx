import React from 'react'
import logo from '../assets/logo.png'
import Link from 'next/link'
import Image from 'next/image'

export default function Navbar()
{
    return (
        <div>
            <nav className="navbar p-0" style={ { backgroundColor: "#222831" } }>
                <div className="container d-flex justify-content-center">
                    <Link href={ "/listpage/1" } className="navbar-brand p-0">
                        <Image src={ logo } alt="Rick and Morty logo" width={ 150 } />
                    </Link>
                </div>
            </nav>
        </div>
    )
}
