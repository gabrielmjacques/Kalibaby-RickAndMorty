import styles from '../styles/Home.module.css'
import logo from '../assets/logo.png'

export default function Home()
{
  return (
    <main>
      <div className={ styles.bg } />

      <div className="col-md-5 col-sm-10 mx-auto pt-5">

        <div className="row">
          <img className={ `p-5 ${styles.logo}` } src={ logo.src } alt="" />
        </div>

        <div className="row mt-5">
          <a className='btn btn-dark' href="/chars">Ver Personagens</a>
        </div>

      </div>
    </main>
  )
}
