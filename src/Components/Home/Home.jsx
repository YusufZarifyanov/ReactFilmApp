import React, {useContext, useEffect, useState} from "react";
import {NavLink} from "react-router-dom";
import {ContextApp, pagination,} from "../../Api/reducer";
import Film from "../Film/Film";
import s from "./Home.module.css"


export const Home = (props) => {
    const [inputText, setInput] = useState('')
    const {state, dispatch} = useContext(ContextApp);
    console.log(state)
    useEffect(() => {
        props.thunkCreator(state.currentPage)(dispatch)
    }, [state.currentPage])

    const handleChange = (e) => {
        setInput(e.target.value)
    }


    const newMas = state.films.map(el => <Film elem={el}/>)
    return (
        <div className={s.wrap}>
            <header>
                <ul className={`pagination`}>
                    {pagination(state.currentPage, dispatch)}
                </ul>

            </header>
            <div className={s.section}>
                <div>

                    <NavLink className="btn btn-small red" to="/sort_popular">Sort movies by popularity</NavLink>

                </div>
                <div>

                    <NavLink className="btn btn-small red" to="/sort_rating">Sort movies by rating</NavLink>

                </div>
                <div>

                    <NavLink className="btn btn-small red" to="/sort_date">Sort movies by date</NavLink>

                </div>
                <div>

                    <NavLink className="btn btn-small red" to="/favorite">Show favorite films</NavLink>

                </div>
            </div>
            <div className={s.inputClass}>
                <input onChange={handleChange} placeholder={'Enter genre'}/>

                <NavLink className="btn btn-small red" to={`/genre/${inputText}`}>Genre</NavLink>

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


export default Home
