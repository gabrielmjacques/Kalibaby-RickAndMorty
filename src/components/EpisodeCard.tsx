import styles from "../styles/EpisodeCard.module.css"

type Props = {
    ep_name: string,
    episode: string,
    air_date: string
}

export default function EpisodeCard(props: Props)
{
    return (
        <div className={ `row mb-3 rounded ${styles.episodeCard}` }>

            <div className="col">
                <div className="row">
                    <p className='text-white-50'>Nome</p>
                </div>

                <div className="row">
                    <p>{ props.ep_name }</p>
                </div>
            </div>

            <div className="col">
                <div className="row">
                    <p className='text-white-50'>Episódio</p>
                </div>

                <div className="row">
                    <p>{ props.episode }</p>
                </div>
            </div>

            <div className="col">
                <div className="row">
                    <p className='text-white-50'>Lançamento</p>
                </div>

                <div className="row">
                    <p>{ props.air_date }</p>
                </div>
            </div>

        </div>
    )
}
