import { Route, Routes } from "react-router-dom";
import "./index.css";
// import OpenRoute from "./Components/AuthRoutes/OpenRoute";
import Signup from "./Pages/Auth/Signup";
import Login from "./Pages/Auth/Login";

function App() {

	return (
		<div>
            <p>IMDB Clone</p>
            <Routes>
                {/* <Route path="/signup" element={<OpenRoute><Signup/></OpenRoute>}/> */}
                <Route path="/signup" element={<Signup/>}/>
                <Route path="/login" element={<Login/>}/>
            </Routes>
        </div>
	);
}

export default App;
