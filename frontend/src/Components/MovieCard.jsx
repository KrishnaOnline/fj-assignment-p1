/* eslint-disable react/prop-types */
import { Link, useNavigate } from "react-router-dom";
import { FiEdit, FiTrash2 } from "react-icons/fi";
import { useSelector } from "react-redux";
import { deleteMovie } from "../services/operations/movieApi";

function MovieCard({movie}) {
    const {token} = useSelector(state => state.auth);
    const navigate = useNavigate();

    const handleDelete = async (movieId) => {
        console.log(movieId);
        await deleteMovie(movieId, token, navigate);
    }

	return (
        <Link to={`/movie/${movie?._id}`} key={movie?._id} className="flex flex-col items-center border-2 border-gray-700 w-[300px] h-[520px] max-sm:w-[90%] p-3 rounded-lg">
            <img
                className="/*h-[325px]*/ min-h-[65%] max-h-[65%] w-[270px] max-sm:w-[95%] rounded" 
                src={movie?.poster}
            />
            <p className="text-2xl flex items-center max-sm:px-7 text-app mt-2 h-[12%] /*h-[60px]*/">
                {movie?.name?.substring(0, 30)}{movie?.name?.length>20 && "..."}
            </p>
            <p className="text-sm mt-2 max-sm:px-7 text-gray-400 h-[12%] /*h-[50px]*/">
                {movie?.plot.substring(0, 70)}{movie?.plot?.length>70 && "..."}
            </p>
            {
                token 
                ?
                <div className="flex max-sm:mt-3 items-center gap-5">
                    <Link to={`/update-movie/${movie?._id}`} className="text-green-500 p-2 flex gap-1 items-center">
                        <FiEdit className="text-3xl"/>
                        <p className="text-lg">Edit</p>
                    </Link>
                    <button onClick={() => handleDelete(movie?._id)} className="text-red-500 p-2 flex gap-1 items-center">
                        <FiTrash2 className="text-3xl"/>
                        <p className="text-lg">Delete</p>
                    </button>
                </div>
                :
                <Link className="bg-app w-[75%] hover:opacity-90 text-center p-2 text-black text-lg rounded-md" to={"/login"}>
                    Login to Edit
                </Link>
            }
            {/* <p className="mt-1 text-[15px]">Cast:</p>
            <div className="flex flex-wrap gap-2">
                {movie?.actors?.slice(0, 4)?.map(a => (
                    <p key={a._id} className="text-sm p-1 px-2 rounded-full bg-gray-700 w-fit">
                        {a?.name}
                    </p>
                ))}
                <p className="text-gray-400">{" "}...</p>
            </div> */}
        </Link>
    );
}

export default MovieCard;
