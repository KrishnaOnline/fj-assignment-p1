import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getMovie } from "../services/operations/movieApi";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function Movie() {
    const {movieId} = useParams();
    const {token} = useSelector(state => state?.auth);
    const [movie, setMovie] = useState(null);

    const fetchMovieById = async () => {
        const response = await getMovie(movieId);
        console.log(response);
        setMovie(response);
    }

    useEffect(() => {
        fetchMovieById();
    }, [movieId]);

	return (
        <div className="flex mb-20 w-full items-center max-sm:justify-center mt-10 flex-wrap gap-5 max-sm:gap-0">
            <div className="flex flex-col md:flex-row items-center justify-between px-3 w-full max-sm:w-full">
                <p className="text-5xl">{movie?.name}</p>
                {
                    token &&
                    <div className="flex max-sm:mt-3 items-center gap-5">
                        <button className="text-green-500 p-2 flex gap-1 items-center">
                            <FiEdit className="text-3xl"/>
                            <p className="text-lg">Edit</p>
                        </button>
                        <button className="text-red-500 p-2 flex gap-1 items-center">
                            <FiTrash2 className="text-3xl"/>
                            <p className="text-lg">Delete</p>
                        </button>
                    </div>
                }
            </div>
            <div className="flex max-sm:flex-col items-center justify-center gap-3 w-full md:h-[450px]">
                <img src={movie?.poster} alt="poster" className="rounded-xl p-2 w-[25%] h-full max-sm:w-full"/>
                <iframe 
                    className="w-[75%] max-sm:w-full max-sm:h-[300px] h-[450px] md:border border-gray-700 rounded"
                    src={`https://www.youtube.com/embed/${movie?.trailer}?autoplay=0&mute=1`}
                >
                </iframe>
            </div>
            <div className="w-full flex flex-row max-sm:flex-col gap-3 max-sm:gap-5 mt-3 px-3 border-2 border-gray-700 p-3 py-4 pb-5 rounded-lg max-sm:w-full">
                <div className="w-[75%] px-3 max-sm:w-[100%] md:border-r-2 border-gray-700">
                    <p className="text-3xl mb-3">Actors</p>
                    <div className="flex flex-wrap">
                        {
                            movie?.actors?.map(a => (
                                <Link to={`/actor/${a._id}`} className="bg-gray-700 p-3 px-4 rounded-full" key={a._id}>
                                    {a?.name}
                                </Link>
                            ))
                        }
                    </div>
                </div>
                <div className="w-[25%] px-3">
                    <p className="text-3xl mb-5">Producer</p>
                    <Link to={`/producer/${movie?.producer?._id}`} className="bg-gray-700 p-3 px-4 w-full rounded-full">
                        {movie?.producer?.name}
                    </Link>
                </div>
            </div>
        </div>
    );
}

export default Movie;