import React, {useContext, useEffect} from "react";

import Film from "../Film/Film";
import {ContextApp, filmsGenreThunkCreator, pagination} from "../../Api/reducer";
import {NavLink} from "react-router-dom";
import s from "./FilmGenre.module.css"


const FilmGenre = (props) => {
    const {state, dispatch} = useContext(ContextApp);

    useEffect(() => {
        filmsGenreThunkCreator(props.match.params.genre, state.currentPage)(dispatch)

    }, [state.currentPage])

    const newMas = state.films.map(el => <Film elem={el}/>)
    console.log('2')
    return (<div className={s.wrap}>
        <header>
            <ul className={`pagination`}>
                {pagination(state.currentPage, dispatch)}
            </ul>

        </header>
        <div className={s.section}>
            <div>

                <NavLink className="btn btn-small red" to="/home">Go home</NavLink>

            </div>
        </div>
        <div className={s.container}>
            <div className="row">
                <div className="col s12 m8 offset-m2 l6 offset-l3" id="posts">
                    {newMas}
                </div>
            </div>
        </div>
    </div>)

}

export default FilmGenre
