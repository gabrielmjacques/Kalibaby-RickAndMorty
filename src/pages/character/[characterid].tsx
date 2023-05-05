import React, { useEffect } from "react"
import { GetServerSideProps } from "next"
import Navbar from "@/components/Navbar"
import EpisodeCard from "@/components/EpisodeCard"

import styles from "../../styles/Character.module.css"

type CharInfo = {
    id: 2,
    name: string,
    status: string,
    species: string,
    type: string,
    gender: string,
    origin: {
        name: string,
        url: string
    },
    location: {
        name: string,
        url: string
    },
    image: string,
    episode: string[],
    url: string,
    created: string
}

type Episode = {
    id: number,
    name: string,
    air_date: string,
    episode: string,
    characters: string[]
    url: string,
    created: string
}

type Props = {
    character: CharInfo,
    episodes: Episode[]
}

export default function CharacterId({ character, episodes }: Props)
{
    return (
        <div className="col bg-dark" style={ { minHeight: "100vh" } }>
            <Navbar />

            <div className="row pt-5 pb-5 justify-content-center">
                <div className={ `col-md-7 p-4 rounded-5 ${styles.charContainer}` }>

                    <div className="row">
                        <div className="col-md-3 col-sm-12 mb-4 d-flex">
                            <img className="rounded-3" src={ character.image } alt="" style={ { width: "100%", maxWidth: "200px", margin: "auto" } } />
                        </div>

                        <div className="col-md-9 col-sm-12">
                            <h3>{ character.name }</h3>

                            <p>Status: { character.status == "Alive" ? "Vivo" : "Morto" }</p>
                            <p>Gênero: { character.gender == "Male" ? "Masculino" : "Feminino" }</p>
                            <p>Espécie: { character.species == "Human" ? "Humano" : character.species }</p>
                            <p>Localização: { character.location.name }</p>
                            <p>Origem: { character.origin.name == "unknown" ? "Desconhecida" : character.origin.name }</p>
                        </div>
                    </div>

                    <div className={ `row mt-5 ${styles.EpList}` }>
                        {
                            episodes.map((ep, index) =>
                            {
                                return <EpisodeCard
                                    key={ index }
                                    ep_name={ ep.name }
                                    episode={ ep.episode }
                                    air_date={ ep.air_date } />
                            })
                        }
                    </div>

                    <div className="row m-3">
                        <button className="btn btn-success">Voltar</button>
                    </div>

                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (context) =>
{
    const { params } = context

    const characterRes = await fetch(`https://rickandmortyapi.com/api/character/${params?.characterid}`);
    const characterData = await characterRes.json();

    const episodePromises = characterData.episode.map((episodeUrl: string) => fetch(episodeUrl));
    const episodesData = await Promise.all(episodePromises);
    const episodesJson = await Promise.all(episodesData.map((episode) => episode.json()));

    return {
        props: {
            character: characterData,
            episodes: episodesJson,
        },
    };
};
