import React from 'react'
import Image from 'next/image'

import styles from "../styles/CharCard.module.css"

type Char = {
    id: number,
    name: string,
    image: string,
    status: string,
    species: string,
    location: string,
    origin: string
}

export default function CharCard(props: Char)
{
    return (
        <div
            className={ styles.charCard }
            onClick={ () => window.location.replace(`../character/${props.id}`) }>

            <div className={ styles.imgContainer }>
                <Image src={ props.image } alt={ `${props.name} image` } />
            </div>

            <div className={ styles.contentContainer }>
                <h4>{ props.name }</h4>
                <p><span className={ props.status == "Alive" ? styles.alive : styles.dead }>{ props.status == "Alive" ? "Vivo" : "Morto" }</span> - { props.species }</p>
                <p>Origem: { props.origin != "unknown" ? props.origin : "Desconhecida" }</p>
            </div>

        </div>
    )
}
