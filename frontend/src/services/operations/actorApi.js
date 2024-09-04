import toast from "react-hot-toast";
import { apiConnector } from "../apiConnector";
import { actorApi } from "../apis";

export const createActor = async (data, token) => {
    const toastId = toast.loading("Adding Actor...");
    try {
        const response = await apiConnector("POST", actorApi.CREATE_ACTOR_API, data, {
            "Authorization": `Bearer ${token}`
        });
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        toast.dismiss(toastId);
        toast.success("Actor Added!");
        return response.data?.data;
    } catch(err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
        console.log(err);
    }
}

export const getAllActors = async () => {
    try {
        const response = await apiConnector("GET", actorApi.GET_ALL_ACTORS_API, null);
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        return response.data?.data;
    } catch(err) {
        console.log(err);
    }
}

export const getActor = async (actorId) => {
    try {
        const response = await apiConnector("GET", actorApi.GET_ACTOR_API+actorId, null);
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        return response.data?.data;
    } catch(err) {
        console.log(err);
    }
}