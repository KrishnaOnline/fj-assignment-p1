import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { userApi } from "../apis";
import { setToken } from "../../redux/slices/authSlice";
import { setUser } from "../../redux/slices/userSlice";

export const signUp = async (data, navigate) => {
    const toastId = toast.loading("Signing Up...");
    try {
        const response = await apiConnector("POST", userApi.SIGN_UP_API, data);
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        toast.dismiss(toastId);
        toast.success("Signed Up");
        navigate("/login");
    } catch(err) {
        toast.dismiss(toastId);
        toast.error(err?.response?.data?.message);
        // console.log(err?.response?.data?.message);
        console.log(err);
        navigate("/signup");
    }
}

export const login = (data, navigate) => {
    return async (dispatch) => {
        const toastId = toast.loading("Logging in...");
        try {
            const response = await apiConnector("POST", userApi.LOGIN_API, data);
            if(response.data.error) {
                throw new Error(response.data.message);
            }
            dispatch(setToken(response.data.token));
            dispatch(setUser(response.data?.data));
            localStorage.setItem("token", JSON.stringify(response.data.token));
            localStorage.setItem("user", JSON.stringify(response.data?.data));
            toast.dismiss(toastId);
            navigate("/");
            toast.success("Logged In");
        } catch(err) {
            console.log(err?.message);
            toast.dismiss(toastId);
            toast.error(err?.response?.data?.message);
            navigate("/login");
        }
    }
}

export const logout = (navigate) => {
    return async (dispatch) => {
        dispatch(setToken(null));
        dispatch(setUser(null));
        toast.success("Logged Out!");
        navigate("/");
        localStorage.clear();
    }
}

export const getUser = async (userId) => {
    try {
        const response = await apiConnector("GET", userApi.GET_USER_API+userId, null);
        if(response.data.error) {
            throw new Error(response.data.message);
        }
        return response.data?.data;
    } catch(err) {
        console.log(err);
    }
}