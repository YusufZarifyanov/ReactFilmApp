import React, {useContext, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {ContextApp, pagination, setCurrentPagesAC} from "../../Api/reducer";
import Film from "../Film/Film";
import s from "./FavoriteFilms.module.css"


export const FavoriteFilms = (props) => {
    console.log(props)
    const {state, dispatch} = useContext(ContextApp);


    console.log(1)
    const newMas = state.favoriteFilms.map(el => <Film elem={el}/>)
    return (
        <div className={s.wrap}>
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
        </div>
    )
}


export default FavoriteFilms
