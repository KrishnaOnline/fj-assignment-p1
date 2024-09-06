import { Route, Routes } from "react-router-dom";
import "./index.css";
import Signup from "./Pages/Signup";
import Login from "./Pages/Login";
import Home from "./Pages/Home";
import Navbar from "./Components/Navbar";
import Movie from "./Pages/Movie";
import Actor from "./Pages/Actor";
import Producer from "./Pages/Producer";
import AddMovie from "./Pages/AddMovie";
import UpdateMovie from "./Pages/UpdateMovie";
import AllActors from "./Pages/AllActors";
import AllProducers from "./Pages/AllProducers";
import OpenRoute from "./Components/AuthRoutes/OpenRoute";
import PrivateRoute from "./Components/AuthRoutes/PrivateRoute";

function App() {

	return (
		<div className="">
            <Navbar/>
            <div className="max-w-[1280px] mx-auto overflow-auto">
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/>
                    <Route path="/login" element={<OpenRoute><Login/></OpenRoute>}/>
                    <Route path="/movie/:movieId" element={<Movie/>}/>
                    <Route path="/actor/:actorId" element={<Actor/>}/>
                    <Route path="/producer/:producerId" element={<Producer/>}/>
                    <Route path="/add-movie" element={<PrivateRoute><AddMovie/></PrivateRoute>}/>
                    <Route path="/update-movie/:movieId" element={<PrivateRoute><UpdateMovie/></PrivateRoute>}/>
                    <Route path="/actors" element={<AllActors/>}/>
                    <Route path="/producers" element={<AllProducers/>}/>
                </Routes>
            </div>
        </div>
	);
}

export default App;
