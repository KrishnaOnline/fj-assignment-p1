import { useState } from "react";
import Input from "../Components/Common/Input";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../services/operations/userApi";
import { useDispatch } from "react-redux";

function Login() {
    const [data, setData] = useState({
        username: "",
        password: "",
    });
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await dispatch(login(data, navigate));
        console.log(response);
    }
    const handleGuestLogin = async () => {
        // e.preventDefault();
        const response = await dispatch(login({
            username: "testuser", 
            password: "123456"
        }, navigate));
        console.log(response);
    }

	return (
        <div className="mt-10 flex flex-col items-center justify-center">
            <p className="text-[45px] mb-1 text-app font-medium">Login</p>
            <form onSubmit={handleSubmit} className="flex mt-5 p-8 gap-8 rounded-xl shadow-lg shadow-black border-2 border-gray-700 flex-col justify-center items-center">
                <div className="flex flex-col gap-4">
                    <Input
                        fieldName={"Username"}
                        placeholder={"Enter Username"}
                        onChangeHandle={e => setData({...data, username: e.target.value})}
                    />
                    <Input
                        fieldName={"Password"}
                        placeholder={"Enter your Password"}
                        onChangeHandle={e => setData({...data, password: e.target.value})}
                    />
                </div>
                <div className="w-full flex flex-col gap-3">
                    <button
                        className="bg-app w-full text-xl font-medium hover:opacity-90 p-2 text-black rounded"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Login   
                    </button>
                    <div className="text-center">(OR)</div>
                    <button
                        className="bg-app w-full text-xl font-medium hover:opacity-90 p-2 text-black rounded"
                        type="button"
                        onClick={handleGuestLogin}
                    >
                        Guest Login   
                    </button>
                </div>
            </form>
            <p className="mt-5">Not Registered yet?, <Link to={"/signup"} className="text-blue-400 underline">SignUp</Link></p>
        </div>
    );
}

export default Login;