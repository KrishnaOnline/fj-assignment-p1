import toast from "react-hot-toast"
import { apiConnector } from "../apiConnector";
import { userApi } from "../apis";

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