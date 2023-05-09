import styles from '../styles/Home.module.css'
import Link from 'next/link'
import Head from 'next/head'

export default function Home()
{
  return (
    <main>
      <Head>
        <title>Rick and Morty - Início</title>
      </Head>

      <div className={ styles.bg }></div>

      <div className={ `col-md-5 col-sm-10 mx-auto ${styles.mainCardContainer}` }>

        <div className={ `row rounded-5 ${styles.mainCard}` }>
          <div className="row mx-auto">

            <div className="row mx-auto">
              <img className={ `p-5 ${styles.logo}` } src={ "/logo.png" } alt="Rick and Morty logo" width={ "50%" } />
            </div>
            <div className="row mx-auto mt-5">
              <Link href="/listpage/1">
                <button className='btn btn-dark w-100'>Ver Personagens</button>
              </Link>
            </div>

          </div>
        </div>
      </div>
    </main>
  )
}
