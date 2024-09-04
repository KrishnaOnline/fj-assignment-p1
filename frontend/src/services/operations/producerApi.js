import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { producerApi } from "../apis";

export const createProducer = async (data, token) => {
    const toastId = toast.loading("Adding Producer...");
    try {
        const response = await apiConnector("POST", producerApi.CREATE_PRODUCER_API, data, {
            "Authorization": `Bearer ${token}`
        });
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        toast.dismiss(toastId);
        toast.success("Producer Added!");
        return response.data?.data;
    } catch(err) {
        toast.dismiss(toastId);
        toast.error(err.response.data.message);
        console.log(err);
    }
}

export const getAllProducers = async () => {
    try {
        const response = await apiConnector("GET", producerApi.GET_ALL_PRODUCERS_API, null);
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        return response.data?.data;
    } catch(err) {
        console.log(err);
    }
}

export const getProducer = async (producerId) => {
    try {
        const response = await apiConnector("GET", producerApi.GET_PRODUCER_API+producerId, null);
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        return response.data?.data;
    } catch(err) {
        console.log(err);
    }
}