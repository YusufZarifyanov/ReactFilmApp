import axios from "axios";

const API_KEY = '4237669ebd35e8010beee2f55fd45546'

export const getFilms = (page) => {
    return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&page=${page}`)
}

export const getImages = (path) => {
    return axios.get(`http://image.tmdb.org/t/p/original${path}`)
}

export const getFilm = (id) => {
    return axios.get(`https://api.themoviedb.org/3/movie/${id}?api_key=${API_KEY}`)
}

export const getFilmsWitGenre = (genre, page) => {
    return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&certification=${genre}&sort_by=vote_average.desc&page=${page}`)
}

export const getPopularFilms = (page) => {
    return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=popularity.desc&page=${page}`)
}


export const getRatingFilms = (page) => {
    return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=vote_average.desc&page=${page}`)
}

export const getNewDateFilms = (page) => {
    return axios.get(`https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&sort_by=primary_release_date.desc&page=${page}`)
}
