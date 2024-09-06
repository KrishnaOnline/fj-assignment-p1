import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import { getAllMovies } from "../services/operations/movieApi";
import MovieCard from "../Components/MovieCard";
import { Link } from "react-router-dom";

function Home() {
    const [movies, setMovies] = useState([]);
    const {token} = useSelector(state => state.auth);
    console.log(token);
    const fetchAllMovies = async () => {
        const response = await getAllMovies();
        setMovies(response);
    }
    useEffect(() => {
        fetchAllMovies();
    }, []);

	return (
        <div className="mt-8">
            <Link to={"/add-movie"} className="bg-green-600 p-2 rounded-lg text-black text-lg">
                Create new Movie
            </Link>
            <div className="flex mt-10 flex-wrap max-sm:justify-center /*justify-center*/ gap-5">
                {
                    movies?.length===0
                    ?
                    <div className="flex px-10 gap-1 text-lg">
                        <p>No Movies to display, </p>
                        <Link className="underline text-blue-500" to={"/add-movie"}>Create One?</Link>
                    </div>
                    :
                    movies?.map(m => (
                        <MovieCard key={m._id} movie={m}/>
                    ))
                }
            </div>
        </div>
    );
}

export default Home;