import React, {useContext, useEffect} from "react";
import { NavLink } from 'react-router-dom';
import 'materialize-css/dist/css/materialize.min.css'
import s from "./Film.module.css"
import {ContextApp, setFavoriteAC, setFilmForChangeAC, setFilmForUnchangeAC, setUnfavoriteAC} from "../../Api/reducer";

const Film = (props) => {
    const {state, dispatch} = useContext(ContextApp);

    console.log(props.elem.chones)
    return (
        <div className="card z-depth-4">
            <div className={`card-content ${s.section}`}>
                <div className={s.posterImg}>
                    <img  src={`http://image.tmdb.org/t/p/original${props.elem.poster_path}`}/>
                </div>
                <div>
                    <span className={`card-title`}>{props.elem.title}</span>
                </div>


            </div>
            <div className={`card-action ${s.section}`}>

                    <NavLink className="btn btn-small red" to={`movie/${props.elem.id}`}>Info</NavLink>

                {/* eslint-disable-next-line no-undef */}
                {!props.elem.chones ? <button className={`btn btn-small red `} onClick={() => dispatch(setFavoriteAC(props.elem.id))}>Add to favorites</button> : <button className={`btn btn-small red `} onClick={() => dispatch(setUnfavoriteAC(props.elem.id))}>Delete to favorites</button>}

            </div>
        </div>
    )
}

export default Film
