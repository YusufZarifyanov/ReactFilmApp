import {getFilm, getFilms, getFilmsWitGenre, getRatingFilms, getPopularFilms, getNewDateFilms} from "./api";
import React from "react";
import s from "../Components/Home/Home.module.css"

export const ContextApp = React.createContext();

export const initialState = {
    films: [],
    film: {},
    currentPage: 1,
    favoriteFilms: []
}

export const filmReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_FILMS': {
            return {
                ...state,
                films: [...action.films],
                film: {...state.film},
                favoriteFilms: [...state.favoriteFilms]
            }
        }
        case 'SET_PAGE': {
            return {
                ...state,
                favoriteFilms: [...state.favoriteFilms],
                film: {...state.film},
                films: [...state.films],
                currentPage: action.page
            }
        }
        case 'SET_FILM': {
            let c = false
            console.log(action.film)
            for (let i=0; i<state.favoriteFilms.length; i++) {
                if (action.film.id === state.favoriteFilms[i].id) {
                    c = true
                }
            }
            console.log(state.favoriteFilms)
            return {
                ...state,
                favoriteFilms:[...state.favoriteFilms],
                films: [...state.films],
                film: {...action.film, chones: c}
            }
        }
        case 'SET_FAVORITE': {
            let a=false
            const mas = [...state.favoriteFilms]
            console.log(state.favoriteFilms)
            state.films = state.films.map(el => {
                if (el.id === action.id) {
                    for (let j=0; j<mas.length; j++){
                        if (mas[j].id === el.id) {
                            a=true
                        }
                        // if (el.id === mas[j].id && mas[j].chones === true) {
                        //     a=false
                        // }
                    }
                    el.chones = true
                }
                return el
            })
            if (!a) {
                mas.push(state.films.filter(el => el.id === action.id)[0])
            }
            return {
                ...state,
                film: {...state.film},
                films: [...state.films],
                favoriteFilms: mas
            }
        }

        case 'SET_UNFAVORITE': {
            const mas = [...state.favoriteFilms]
            for (let i = 0; i < mas.length; i++) {
                if (mas[i].id === action.id) {
                    mas.splice(i, 1)
                }
            }

            state.films = state.films.map(el => {
                if (el.id === action.id) {
                    el.chones = false
                }
                return el
            })

            return {
                ...state,
                films: [...state.films],
                film: {...state.film},
                favoriteFilms: mas
            }


        }
        case 'SET_FAVORITE_FILM': {
            let a = false
            const mas = [...state.favoriteFilms]
            for (let j=0; j<mas.length; j++){
                if (mas[j].id === action.film.id) {
                    a=true
                }
            }
            if (!a) {
                mas.push(action.film)
            }
            return {
                ...state,
                film: {...state.film, chones: true},
                films: [...state.films],
                favoriteFilms: mas// [...state.favoriteFilms, state.films.filter(el => el.id === action.id)[0]]
            }
        }

        case 'SET_UNFAVORITE_FILM': {
            const n = state.favoriteFilms.length
            for (let i = 0; i < state.favoriteFilms.length; i++) {
                if (state.favoriteFilms[i].id === action.film.id) {
                    state.favoriteFilms.splice(i, 1)
                }
            }

            return {
                ...state,
                film: {...state.film, chones: false},
                films: [...state.films],
                favoriteFilms: [...state.favoriteFilms]
            }
        }


        default:
            return state
    }
}

export const setFilmsAC = (films) => {
    return {
        type: 'SET_FILMS',
        films
    }
}

export const setFilmAC = (film) => {
    return {
        type: 'SET_FILM',
        film
    }
}

export const setFilmForChangeAC = (film) => {
    return {
        type: 'SET_FAVORITE_FILM',
        film
    }
}

export const setFilmForUnchangeAC = (film) => {
    return {
        type: 'SET_UNFAVORITE_FILM',
        film
    }
}

export const setCurrentPagesAC = (page) => {
    return {
        type: 'SET_PAGE',
        page
    }
}

export const setFavoriteAC = (id) => {
    return {
        type: 'SET_FAVORITE',
        id
    }
}

export const setUnfavoriteAC = (id) => {
    return {
        type: 'SET_UNFAVORITE',
        id
    }
}


export const filmsThunkCreator = (page) => {
    return function (dispatch) {
        getFilms(page)
            .then(response => dispatch(setFilmsAC(response.data.results.map(el => ({...el, chones: false})))))
    }
}


export const filmsGenreThunkCreator = (genre, page) => {
    return function (dispatch) {
        getFilmsWitGenre(genre, page)
            .then(response => dispatch(setFilmsAC(response.data.results.map(el => ({...el, chones: false})))))
    }
}

export const filmsPopularThunkCreator = (page) => {
    return function (dispatch) {
        getPopularFilms(page)
            .then(response => dispatch(setFilmsAC(response.data.results.map(el => ({...el, chones: false})))))
    }
}

export const filmThunkCreator = (id) => {
    return (dispatch) => {
        getFilm(id)
            .then(response =>dispatch(setFilmAC({...response.data})))
    }
}

export const filmRatingThunkCreator = (page) => {
    return (dispatch) => {
        getRatingFilms(page)
            .then(response => dispatch(setFilmsAC(response.data.results.map(el => ({...el, chones: false})))))
    }
}

export const filmReleaseDateThunkCreator = (page) => {
    return (dispatch) => {
        getNewDateFilms(page)
            .then(response => dispatch(setFilmsAC(response.data.results.map(el => ({...el, chones: false})))))

    }
}

export const pagination = (cur, callback) => {
    let pages = []
    for (let i = 1; i <= 5; i++) {
        pages.push(i)
    }
    const newPages = pages.map(el => {
        return (<>
                {el === cur ?
                    <li className={`active ${s.page}`}>{el}</li> :
                    <li className={`waves-effect ${s.page}`} onClick={() => callback(setCurrentPagesAC(el))}>{el}</li>}
            </>
        )
    })
    return newPages
}
