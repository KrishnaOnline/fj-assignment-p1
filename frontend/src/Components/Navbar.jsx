import Logo from "../assets/IMDB_Logo.png";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../services/operations/userApi";
import { Link, useNavigate } from "react-router-dom";

function Navbar() {
    const {token} = useSelector(state => state?.auth);
    const {user} = useSelector(state => state?.user);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const handleLogout = async () => {
        await dispatch(logout(navigate));
    }

	return (
        <div className="h-[70px] flex justify-between px-10 border-b-2 border-gray-700 items-center">
            <Link to={"/"} className="flex items-center gap-2">
                <img src={Logo} alt="logo" className="h-[45px]"/>
                {/* <p className="text-2xl font-medium">Lite</p> */}
            </Link>
            <div>
                {
                    token 
                    ?
                    <div className="flex items-center gap-4">
                        <p className="text-lg">Hi, {user?.username}!</p>
                        <button onClick={handleLogout} className="bg-red-600 p-[5px] px-[10px] rounded-md text-lg">Logout</button>
                    </div>
                    :
                    <div className="flex gap-5 items-center justify-center">
                        <Link to={"/login"} className="bg-gray-700 p-[5px] px-[10px] text-lg rounded-md">Login</Link>
                        <Link to={"/signup"} className="bg-gray-700 p-[5px] px-[10px] text-lg rounded-md">SignUp</Link>
                    </div>
                }
            </div>
        </div>
    );
}

export default Navbar;