import { Route, Routes } from "react-router-dom";
import "./index.css";
// import OpenRoute from "./Components/AuthRoutes/OpenRoute";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Movie from "./Pages/Movie";

function App() {

	return (
		<div>
            <Navbar/>
            <div className="max-w-[1280px] mx-auto">
                <Routes>
                    {/* <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/> */}
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/movie/:movieId" element={<Movie/>}/>
                </Routes>
            </div>
        </div>
	);
}

export default App;
