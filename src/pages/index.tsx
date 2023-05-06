import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Image from 'next/image'

export default function Home()
{
  return (
    <main>
      <div className={ styles.bg } />

      <div className="col-md-5 col-sm-10 mx-auto pt-5">

        <div className="row">
          <img className={ `p-5 ${styles.logo}` } src={ "/logo.png" } alt="Rick and Morty logo" width={ "50%" } />
        </div>

        <div className="row mt-5">
          <Link className='btn btn-dark' href="/listpage/1">Ver Personagens</Link>
        </div>

      </div>
    </main>
  )
}
