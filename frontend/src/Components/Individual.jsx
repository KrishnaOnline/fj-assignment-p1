/* eslint-disable react/prop-types */
import MovieCard from "./MovieCard";

function Individual({data, role}) {
	return (
        <div className="mt-5 mb-20 flex flex-col flex-wrap">
            <div className="flex flex-col flex-wrap gap-3 /*border-b border-gray-700*/ pb-3">
                <p className="text-4xl text-app">{data?.name} <span className="text-lg text-gray-400">({role}, {data?.gender})</span></p>
                <p className="text-gray-300 text-base">{data?.bio}</p>
            </div>
            <p className="text-2xl underline">Movies Associated:</p>
            <div className="mt-7 flex flex-wrap max-sm:justify-center /*justify-center*/ gap-5">
                {
                    data?.movies?.map(m => (
                        <MovieCard key={m?._id} movie={m}/>
                    ))
                }
            </div>
        </div>
    );
}

export default Individual;