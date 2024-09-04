import { Route, Routes } from "react-router-dom";
import "./index.css";
// import OpenRoute from "./Components/AuthRoutes/OpenRoute";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";

function App() {

	return (
		<div className="max-w-[1280px] mx-auto">
            <p>IMDB Clone</p>
            <Routes>
                {/* <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/> */}
                <Route path="/" element={<Home/>}/>
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
	);
}

export default App;
