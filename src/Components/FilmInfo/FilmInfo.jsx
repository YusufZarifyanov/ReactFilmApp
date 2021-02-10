import React, {useContext, useEffect} from "react";
import {NavLink} from 'react-router-dom';
import {
    ContextApp,
    filmThunkCreator,
    setFavoriteAC,
    setFilmForChangeAC,
    setFilmForUnchangeAC,
    setUnfavoriteAC
} from "../../Api/reducer";
import styles from "./FilmInfo.module.css"


const FilmInfo = (props) => {
    const {state, dispatch} = useContext(ContextApp);
    console.log(state.film)
    useEffect(() => {
        filmThunkCreator(props.match.params.movieId)(dispatch)
    }, [])
    return (
        <div className={`card z-depth-4 ${styles.wrap}`}>
            <div className={`card-content ${styles.section}`}>
                <div className={styles.posterImg}>
                    <img src={`http://image.tmdb.org/t/p/original${state.film.poster_path}`} width="90%" height="90%"/>
                    <div>
                        <p className={styles.smallTagline}>{state.film.tagline}</p>
                    </div>

                </div>
                <div>
                    <ul className={styles.list}>
                        <li className={styles.elem}>Title: {state.film.title}</li>
                        <li className={styles.elem}>Budget: {state.film.budget}</li>
                        <li className={styles.elem}><a href={state.film.homepage}>Home page</a></li>
                        <li className={styles.elem}>Vote average: {state.film.vote_average}</li>
                    </ul>
                </div>

            </div>
            <div className={`card-action ${styles.section}`}>

                <NavLink to="/home" className="btn btn-small red">Go home</NavLink>

                {/*{!state.film.chosen ? <button className={`btn btn-small red `} onClick={() => dispatch(setFavoriteAC())}>Add to favorites</button> : <button className={`btn btn-small red `} onClick={() => dispatch(setUnfavoriteAC())}>Delete to favorites</button>}*/}
                {!state.film.chones ? <button className={`btn btn-small red `}
                                              onClick={() => dispatch( setFilmForChangeAC(state.film))}>Add to
                    favorites</button> : <button className={`btn btn-small red `}
                                                 onClick={() => dispatch( setFilmForUnchangeAC(state.film))}>Delete to
                    favorites</button>}
            </div>
        </div>

    )
}
export default FilmInfo
