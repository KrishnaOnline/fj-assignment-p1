import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import { getAllMovies } from "../services/operations/movieApi";
import MovieCard from "../Components/MovieCard";

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
            <div className="flex flex-wrap max-sm:justify-center /*justify-center*/ gap-5">
                {
                    movies?.map(m => (
                        <MovieCard key={m._id} movie={m}/>
                    ))
                }
            </div>
        </div>
    );
}

export default Home;