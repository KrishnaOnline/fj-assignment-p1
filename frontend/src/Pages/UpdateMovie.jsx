import { useParams } from "react-router-dom";
import ConfigureMovie from "../Components/ConfigureMovie";
import { useEffect, useState } from "react";
import { getMovie } from "../services/operations/movieApi";

function UpdateMovie() {
    const {movieId} = useParams();
    const [data, setData] = useState({
        name: "",
        yearOfRelease: "",
        plot: "",
        poster: "",
        trailer: "",
        actors: null,
        producer: "",
    });

    const fetchMovie = async () => {
        const response = await getMovie(movieId);
        setData(response);
        console.log(data);
    }

    useEffect(() => {
        fetchMovie();
    }, [movieId]);

	return (
        <div>
            <ConfigureMovie data={data} setData={setData} type={"Edit"}/>
        </div>
    );
}

export default UpdateMovie;