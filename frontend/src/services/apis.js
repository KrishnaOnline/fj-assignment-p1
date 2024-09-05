// const BASE_URL = import.meta.VITE_BASE_URL;
const BASE_URL = "http://localhost:5000/api/v1";

export const userApi = {
    SIGN_UP_API: BASE_URL+"/user/signup",
    LOGIN_API: BASE_URL+"/user/login",
    GET_USER_API: BASE_URL+"/user/",  // + userId
}

export const movieApi = {
    CREATE_MOVIE_API: BASE_URL+"/movies",
    GET_MOVIE_API: BASE_URL+"/movies/",  // + movieId
    GET_ALL_MOVIES_API: BASE_URL+"/movies",
    UPDATE_MOVIE_API: BASE_URL+"/movies",  // + movieId
    DELETE_MOVIE_API: BASE_URL+"/movies",  // + movieId
}

export const actorApi = {
    CREATE_ACTOR_API: BASE_URL+"/actors",
    GET_ALL_ACTORS_API: BASE_URL+"/actors",
    GET_ACTOR_API: BASE_URL+"/actors/",  // + actorId
}

export const producerApi = {
    CREATE_PRODUCER_API: BASE_URL+"/producers",
    GET_ALL_PRODUCERS_API: BASE_URL+"/producers",
    GET_PRODUCER_API: BASE_URL+"/producers/",  // + producerId
}