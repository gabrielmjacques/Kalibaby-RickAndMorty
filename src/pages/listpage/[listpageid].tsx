import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import Navbar from '@/components/Navbar'
import CharCard from '@/components/CharCard'
import SearchInput from '@/components/SearchInput'

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

export default function ListPageId(data: CharsProps)
{
    const [disPrevBtn, setDisPrevBtn] = useState<boolean>(false);
    const [disNextBtn, setDisNextBtn] = useState<boolean>(false);

    const router = useRouter()
    const pageId = Number(router.query.listpageid)

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

    return (
        <div className={ `col anim-background` } style={ { minHeight: "100vh" } }>
            <Head>
                <title>Rick and Morty - Personagens</title>
            </Head>
            <Navbar />

            <div className="row pt-5 justify-content-center">
                <SearchInput />

                { RenderChars() }

                <div className={ `row pb-5 ${styles.pageControl}` }>
                    <div className="col-10">
                        <button
                            className='btn btn-success w-100'
                            disabled={ disPrevBtn }
                            onClick={ () => window.location.replace(String(pageId - 1)) }>Anterior</button>

                        <button
                            className='btn btn-success w-100'
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
    const page_id = params?.listpageid

    const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${page_id}`)
    const data = await res.json()

    return {
        props: data
    }
}