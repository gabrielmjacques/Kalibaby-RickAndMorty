import React from 'react'
import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import Navbar from '@/components/Navbar'
import CharCard from '@/components/CharCard'

import styles from "@/styles/ListPage.module.css"
import Head from 'next/head'

interface Character
{
    id: number,
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

interface CharsProps
{
    info: {
        count: number,
        pages: number,
        next: string,
        prev: string
    }
    results: Character[]
}

export default function Search(data: CharsProps)
{
    const [search, setSearch] = useState<string>();
    const [disPrevBtn, setDisPrevBtn] = useState<boolean>(false);
    const [disNextBtn, setDisNextBtn] = useState<boolean>(false);

    const router = useRouter()
    const search_param = router.query.search
    const pageId = Number(router.query.page)

    useEffect(() =>
    {
        pageId == 1 ? setDisPrevBtn(true) : setDisPrevBtn(false)
        pageId == data.info.pages ? setDisNextBtn(true) : setDisNextBtn(false)
    }, [pageId])


    const RenderChars = () =>
    {
        return data.results.map(
            (char, index) =>
            {
                return <CharCard
                    key={ index }
                    id={ char.id }
                    name={ char.name }
                    image={ char.image }
                    status={ char.status }
                    species={ char.species }
                    location={ char.location.name }
                    origin={ char.origin.name } />
            }
        )
    }

    const Search = () =>
    {
        setSearch(search?.replaceAll(" ", "+"))
        window.location.replace(`/search/${search}/1`)
    }

    return (
        <div className={ `col anim-background` } style={ { minHeight: "100vh" } }>
            <Head>
                <title>Rick and Morty - Pesquisa: { search_param }</title>
            </Head>
            <Navbar />

            <div className="row pt-5 justify-content-center">
                <div className="row">
                    <div className="col-md-6 col-sm-11 mx-auto">
                        <div className="input-group mb-3">
                            <input
                                type="text"
                                className={ `form-control bg-dark text-white me-1 border-0 ${styles.searchInput}` }
                                placeholder="Pesquisar Personagem"
                                aria-label="Recipient's username" aria-describedby="button-addon2"
                                onChange={ (e) => setSearch(e.target.value) } />
                            <button
                                className="btn btn-outline-success"
                                type="button" id="button-addon2"
                                onClick={ () => { Search() } }>Button</button>
                        </div>
                    </div>
                </div>

                { RenderChars() }

                <div className={ `row pb-5 ${styles.pageControl}` }>
                    <div className="col-6">
                        <button
                            className='btn btn-success'
                            disabled={ disPrevBtn }
                            onClick={ () => window.location.replace(String(pageId - 1)) }>Anterior</button>

                        <button
                            className='btn btn-success'
                            disabled={ disNextBtn }
                            onClick={ () => window.location.replace(String(pageId + 1)) }>Próximo</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps<CharsProps> = async (context) =>
{
    const { params } = context
    const search = params?.search
    const page = params?.page

    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${String(page).replaceAll("%20", "+")}&name=${search}`)
    const data = await res.json()

    return {
        props: data
    }
}