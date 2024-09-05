import { Route, Routes } from "react-router-dom";
import "./index.css";
// import OpenRoute from "./Components/AuthRoutes/OpenRoute";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Movie from "./Pages/Movie";
import Actor from "./Pages/Actor";
import Producer from "./Pages/Producer";
import AddMovie from "./Pages/AddMovie";
import UpdateMovie from "./Pages/UpdateMovie";

function App() {

	return (
		<div className="">
            <Navbar/>
            <div className="max-w-[1280px] mx-auto overflow-auto">
                <Routes>
                    {/* <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/> */}
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/movie/:movieId" element={<Movie/>}/>
                    <Route path="/actor/:actorId" element={<Actor/>}/>
                    <Route path="/producer/:producerId" element={<Producer/>}/>
                    <Route path="/add-movie" element={<AddMovie/>}/>
                    <Route path="/update-movie/:movieId" element={<UpdateMovie/>}/>
                </Routes>
            </div>
        </div>
	);
}

export default App;
