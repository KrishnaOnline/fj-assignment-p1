import { useEffect, useState } from "react";
import {useSelector} from "react-redux";
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
            <div className="flex flex-wrap justify-center h-[450px] gap-10">
                {
                    movies.map(m => (
                        <div key={m._id} className="border-2 border-gray-700 p-3 rounded-lg">
                            <img
                                className="h-[325px] w-[250px] rounded" 
                                src={m?.poster}
                            />
                            <p className="text-lg text-app mt-1">{m?.name}</p>
                            <p className="text-sm text-gray-400">{m?.plot.substring(0, 50)}...</p>
                            <p className="mt-1 text-[15px]">Cast:</p>
                            <div className="flex flex-wrap gap-2">
                                {m?.actors?.slice(0, 4)?.map(a => (
                                    <p key={a._id} className="text-sm p-1 px-2 rounded-full bg-gray-700 w-fit">
                                        {a?.name}
                                    </p>
                                ))}
                                <p className="text-gray-400">{" "}...</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default Home;