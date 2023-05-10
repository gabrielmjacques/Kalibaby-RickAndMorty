import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'

import Navbar from '@/components/Navbar'
import CharCard from '@/components/CharCard'

import styles from "@/styles/ListPage.module.css"
import Head from 'next/head'
import SearchInput from '@/components/SearchInput'

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
        try
        {
            pageId == 1 ? setDisPrevBtn(true) : setDisPrevBtn(false)
            pageId == data.info.pages ? setDisNextBtn(true) : setDisNextBtn(false)
        } catch {
            setDisPrevBtn(true)
            setDisNextBtn(true)
        }
    }, [pageId])


    const RenderChars = () =>
    {
        try
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
        } catch {
            return <div className={ `${styles.errContainer}` }>
                <div className="row text-center">
                    <h3 className='text-white'>Personagem não encontrado</h3>
                    <p className='text-white-50'>Parece que a sua busca não retornou nenhum resultado... Tente pesquisar novamente</p>
                </div>

                <div className="row">
                    <button
                        className='btn btn-success'
                        onClick={ () => window.location.replace("/listpage/1") }>Voltar para o início</button>
                </div>
            </div>
        }
    }

    return (
        <div className={ `col anim-background` } style={ { minHeight: "100vh" } }>
            <Head>
                <title>Rick and Morty - Pesquisa: { search_param }</title>
            </Head>
            <Navbar />

            <div className="row pt-5 justify-content-center">
                <SearchInput />

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

    try
    {
        const res = await fetch(`https://rickandmortyapi.com/api/character/?page=${String(page).replaceAll("%20", "+")}&name=${search}`)
        const data = await res.json()

        return {
            props: data
        }
    } catch {
        const data = "err"

        return {
            props: data
        }
    }
}