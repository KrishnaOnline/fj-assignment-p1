import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import { getAllMovies } from "../services/operations/movieApi";
import MovieCard from "../Components/MovieCard";
import BasicModal from "../Components/Modal";
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
        <div className="mt-16">
            <BasicModal/>
            <div className="flex flex-wrap max-sm:justify-center /*justify-center*/ gap-5">
                {
                    movies?.length===0
                    ?
                    <div className="flex gap-1 text-lg">
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