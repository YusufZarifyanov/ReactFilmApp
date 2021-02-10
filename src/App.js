import './App.css';
import Route from "react-router-dom/Route"
import Home from "./Components/Home/Home";
import FilmInfo from "./Components/FilmInfo/FilmInfo";
import FilmGenre from "./Components/FiimGenre/FilmGenre";
import {BrowserRouter, NavLink} from "react-router-dom";
import React, {useReducer} from 'react'


import {
    ContextApp, filmRatingThunkCreator,
    filmReducer, filmReleaseDateThunkCreator,
    filmsPopularThunkCreator,
    filmsThunkCreator,
    initialState
} from "./Api/reducer";
import FavoriteFilms from "./Components/FavoriteFilms/FavoriteFilms";

const App = (props) => {
    console.log(props)
    const [state, dispatch] = useReducer(filmReducer, initialState);

    return (
        <ContextApp.Provider value={{dispatch, state}}>

            <BrowserRouter>
                <Route path="/home" render={(props) => <Home thunkCreator={filmsThunkCreator}/>}/>
                <Route path="/sort_popular" render={(props) => <Home thunkCreator={filmsPopularThunkCreator}/>}/>
                <Route path="/sort_rating" render={(props) => <Home thunkCreator={filmRatingThunkCreator}/>}/>
                <Route path="/sort_date" render={(props) => <Home thunkCreator={filmReleaseDateThunkCreator}/>}/>
                <Route path="/genre/:genre?" render={(props) => <FilmGenre {...props} />}/>
                <Route path="/movie/:movieId?" render={(props) => <FilmInfo {...props}/> } />
                <Route path="/favorite" render={(props) => <FavoriteFilms />} />
            </BrowserRouter>
        </ContextApp.Provider>
    )
};

export default App
