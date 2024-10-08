import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import { getAllMovies } from "../services/operations/movieApi";
import MovieCard from "../Components/MovieCard";
import { Link } from "react-router-dom";

function Home() {
    const [movies, setMovies] = useState([]);
    const [loading, setLoading] = useState(false);
    const {token} = useSelector(state => state.auth);
    console.log(token);
    const fetchAllMovies = async () => {
        setLoading(true);
        const response = await getAllMovies();
        setMovies(response);
        setLoading(false);
    }
    useEffect(() => {
        fetchAllMovies();
    }, []);

	return (
        <div className="mt-8 mb-10">
            <div className="flex justify-between flex-wrap gap-5 items-center">
                <div className="flex items-center gap-4 px-10">
                    <Link to={"/add-movie"} className="bg-green-600 p-[5px] px-[10px] border-2 border-black rounded-lg text-black text-lg">
                        Create new Movie
                    </Link>
                    <div className="flex items-center justify-center gap-3">
                        <Link className="text-lg border-2 border-gray-700 p-[5px] px-[10px] rounded bg-app text-black" to={"/actors"}>All Actors</Link>
                        <Link className="text-lg border-2 border-gray-700 p-[5px] px-[10px] rounded bg-app text-black" to={"/producers"}>All Producers</Link>
                    </div>
                </div>
                <div className="flex items-center px-10 gap-2">
                    {/* <p className="text-lg underline pr-3">Profiles: </p> */}
                    <Link className="text-lg border-2 border-gray-700 bg-[#1E3A8A] p-[5px] px-[10px] rounded" target="_blank" to={"https://dub.sh/krishnavamshi"}>Portfolio</Link>
                    <Link className="text-lg border-2 border-gray-700 bg-[#242938] p-[5px] px-[10px] rounded" target="_blank" to={"https://git.new/krishna-github"}>GitHub</Link>
                    <Link className="text-lg border-2 border-gray-700 bg-[#0077B5] p-[5px] px-[10px] rounded" target="_blank" to={"https://dub.sh/kkv-linkedin"}>LinkedIn</Link>
                </div>
            </div>
            {
                loading===true
                ?
                <div className="flex mt-40 justify-center text-5xl">
                    <p>Loading...</p>
                </div>
                :
                <div className="flex mt-10 flex-wrap justify-center /*justify-center*/ gap-5">
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
            }
        </div>
    );
}

export default Home;
