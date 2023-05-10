import { useState } from 'react';

import styles from "../styles/SearchInput.module.css";

export default function SearchInput()
{
    const [search, setSearch] = useState<string>();

    const Search = () =>
    {
        setSearch(search?.replaceAll(" ", "+"))
        window.location.replace(`/search/${search}/1`)
    }

    return (
        <div className="row">
            <div className="col-md-6 col-sm-11 mx-auto">
                <div className="input-group mb-3">
                    <input
                        type="text"
                        className={ `form-control bg-dark text-white me-1 border-0 ${styles.searchInput}` }
                        placeholder="Pesquisar Personagem"
                        aria-label="Recipient's username" aria-describedby="button-addon2"
                        onChange={ (e) => setSearch(e.target.value) }
                        onKeyDown={ (e) =>
                        {
                            if (e.key == "Enter") { Search() }
                        } } />
                    <button
                        className="btn btn-outline-success"
                        type="button" id="button-addon2"
                        onClick={ () => { Search() } }>Pesquisar</button>
                </div>
            </div>
        </div>
    )
}
