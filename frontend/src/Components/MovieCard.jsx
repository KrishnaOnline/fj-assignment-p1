/* eslint-disable react/prop-types */
import { Link } from "react-router-dom";

function MovieCard({movie}) {
	return (
        <Link to={`/movie/${movie?._id}`} key={movie?._id} className="flex flex-col items-center border-2 border-gray-700 w-[300px] h-[520px] max-sm:w-[90%] p-3 rounded-lg">
            <img
                className="/*h-[325px]*/ min-h-[65%] max-h-[65%] w-[270px] max-sm:w-[95%] rounded" 
                src={movie?.poster}
            />
            <p className="text-xl max-sm:px-7 text-app mt-2 h-[12%] /*h-[60px]*/">
                {movie?.name?.substring(0, 30)}{movie?.name?.length>20 && "..."}
            </p>
            <p className="text-sm mt-2 max-sm:px-7 text-gray-400 h-[12%] /*h-[50px]*/">
                {movie?.plot.substring(0, 67)}{movie?.plot?.length>67 && "..."}
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
    );
}

export default MovieCard;
