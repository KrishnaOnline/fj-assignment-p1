import { useState } from "react";
import Input from "../Components/Common/Input";
import { signUp } from "../services/operations/userApi";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
    const [data, setData] = useState({
        name: "",
        username: "",
        password: "",
    });
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await signUp(data, navigate);
        console.log(response);
    }

	return (
        <div className="mt-10 flex flex-col items-center justify-center">
            <p className="text-[45px] mb-1 text-app font-medium">Sign Up</p>
            <form onSubmit={handleSubmit} className="flex mt-5 p-8 gap-8 rounded-xl shadow-lg shadow-black border-2 border-gray-700 flex-col justify-center items-center">
                <div className="flex flex-col gap-4">
                    <Input 
                        fieldName={"Name"}
                        placeholder={"Enter your Name"}
                        onChangeHandle={e => setData({...data, name: e.target.value})}
                    />
                    <Input
                        fieldName={"Username"}
                        placeholder={"Create Username"}
                        onChangeHandle={e => setData({...data, username: e.target.value})}
                    />
                    <Input
                        fieldName={"Password"}
                        placeholder={"Create your Password"}
                        onChangeHandle={e => setData({...data, password: e.target.value})}
                    />
                </div>
                <button
                    className="bg-app w-full text-xl font-medium hover:opacity-90 p-2 text-black rounded"
                    type="submit"
                    onClick={handleSubmit}
                >
                    SignUp    
                </button>
            </form>
            <p className="mt-5">Already Registered?, <Link to={"/login"} className="text-blue-400 underline">Login</Link></p>
        </div>
    );
}

export default Signup;