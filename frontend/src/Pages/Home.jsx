import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
import {Link} from "react-router-dom";
import { getAllMovies } from "../services/operations/movieApi";

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
            <div className="flex flex-wrap justify-center gap-5">
                {
                    movies?.map(m => (
                        <Link to={`/movie/${m._id}`} key={m._id} className="flex flex-col items-center border-2 border-gray-700 w-[300px] h-[520px] max-sm:w-[90%] p-3 rounded-lg">
                            <img
                                className="/*h-[325px]*/ min-h-[65%] max-h-[65%] w-[270px] max-sm:w-[95%] rounded" 
                                src={m?.poster}
                            />
                            <p className="text-xl max-sm:px-7 text-app mt-2 h-[12%] /*h-[60px]*/">
                                {m?.name.substring(0, 30)}{m?.name?.length>20 && "..."}
                            </p>
                            <p className="text-sm mt-2 max-sm:px-7 text-gray-400 h-[12%] /*h-[50px]*/">
                                {m?.plot.substring(0, 67)}{m?.plot?.length>67 && "..."}
                            </p>
                            <p className="bg-gray-700 p-2 px-3 mt-0 rounded-full">
                                Watch Trailer
                            </p>
                            {/* <p className="mt-1 text-[15px]">Cast:</p>
                            <div className="flex flex-wrap gap-2">
                                {m?.actors?.slice(0, 4)?.map(a => (
                                    <p key={a._id} className="text-sm p-1 px-2 rounded-full bg-gray-700 w-fit">
                                        {a?.name}
                                    </p>
                                ))}
                                <p className="text-gray-400">{" "}...</p>
                            </div> */}
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default Home;