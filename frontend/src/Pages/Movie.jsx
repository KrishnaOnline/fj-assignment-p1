import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { deleteMovie, getMovie } from "../services/operations/movieApi";
import { FiEdit, FiTrash2 } from "react-icons/fi";

function Movie() {
    const {movieId} = useParams();
    const {token} = useSelector(state => state?.auth);
    const [movie, setMovie] = useState(null);
    const navigate = useNavigate();

    const fetchMovieById = async () => {
        const response = await getMovie(movieId);
        console.log(response);
        setMovie(response);
    }

    const handleDelete = async () => {
        console.log(movie?._id);
        await deleteMovie(movie?._id, token, navigate);
    }

    useEffect(() => {
        fetchMovieById();
    }, [movieId]);

	return (
        <div className="flex mb-10 w-full items-center max-sm:justify-center mt-10 flex-wrap gap-5 max-sm:gap-0">
            <div className="flex flex-col md:flex-row items-center justify-between px-3 w-full max-sm:w-full">
                <div className="">
                    <p className="text-5xl mb-2">{movie?.name}</p>
                    <p className="text-gray-300 pl-1">• {new Date(movie?.yearOfRelease).getFullYear()}</p>
                </div>
                {
                    token &&
                    <div className="flex max-sm:mt-3 items-center gap-5">
                        <button className="text-green-500 p-2 flex gap-1 items-center">
                            <FiEdit className="text-3xl"/>
                            <p className="text-lg">Edit</p>
                        </button>
                        <button onClick={handleDelete} className="text-red-500 p-2 flex gap-1 items-center">
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
                    src={`https://www.youtube.com/embed/${movie?.trailer}?autoplay=0`}
                >
                </iframe>
            </div>
            <div className="px-3 w-full border-b pb-3 border-gray-700">
                <p className="text-2xl">Plot:</p>
                <p className="text-gray-400">{movie?.plot}</p>
            </div>
            <div className="w-full">
                <div className="flex max-sm:pt-3 px-3 border-b mb-4 pb-4 border-gray-700 gap-10">
                    <p className="text-lg font-semibold">Cast :</p>
                    <div className="flex gap-3 flex-wrap items-center">
                        {
                            movie?.actors?.map(a => (
                                <div key={a?._id} className="flex items-center gap-2">
                                    <p>•</p>
                                    <Link to={`/actor/${a._id}`} className="text-lg text-blue-500 underline">
                                        {a?.name}
                                    </Link>
                                </div>
                            ))
                        }
                    </div>
                </div>
                <div className="flex px-3 border-b-0 pb-4 border-gray-700 gap-10">
                    <p className="text-lg font-semibold">Producer :</p>
                    <div className="flex gap-3 flex-wrap items-center">
                        <div className="flex items-center gap-2">
                            <Link to={`/producer/${movie?.producer?._id}`} className="text-lg text-blue-500 underline">
                                {movie?.producer?.name}
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Movie;