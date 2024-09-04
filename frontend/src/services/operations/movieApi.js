import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { movieApi } from "../apis";

export const createMovie = async (data, token) => {
    const toastId = toast.loading("Adding Movie...");
    try {
        const response = await apiConnector("POST", movieApi.CREATE_MOVIE_API, data, {
            "Authorization": `Bearer ${token}`
        });
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        toast.dismiss(toastId);
        toast.success("Movie Added!");
        return response.data?.data;
    } catch(err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
        console.log(err);
    }
}

export const getAllMovies = async () => {
    try {
        const response = await apiConnector("GET", movieApi.GET_ALL_MOVIES_API, null);
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        return response.data?.data;
    } catch(err) {
        console.log(err);
    }
}

export const getMovie = async (movieId) => {
    try {
        const response = await apiConnector("GET", movieApi.GET_MOVIE_API+movieId, null);
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        return response.data?.data;
    } catch(err) {
        console.log(err);
    }
}

export const updateMovie = async (data, movieId, token) => {
    const toastId = toast.loading("Updating Movie...");
    try {
        const response = await apiConnector("PUT", movieApi.UPDATE_MOVIE_API+movieId, data, {
            "Authorization": `Bearer ${token}`
        });
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        toast.dismiss(toastId);
        toast.success("Movie Updated!");
        return response.data?.data;
    } catch(err) {
        toast.error(err.response.data.message);
        console.log(err);
    }
}

export const deleteMovie = async (movieId, token) => {
    const toastId = toast.loading("Deleting Movie...");
    try {
        const response = await apiConnector("DELETE", movieApi.DELETE_MOVIE_API+movieId, null, {
            "Authorization": `Bearer ${token}`
        });
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        toast.dismiss(toastId);
        toast.success("Movie Deleted!");
    } catch(err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
        console.log(err);
    }
}