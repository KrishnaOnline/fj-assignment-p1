import { useEffect, useState } from "react";
import { getAllActors } from "../services/operations/actorApi";

function ConfigureMovie() {
    const [data, setData] = useState({
        name: "",
        yearOfRelease: "",
        plot: "",
        poster: "",
        trailer: "",
        actors: [],
        producer: "",
    });

    const [actorsData, setActorsData] = useState([]);

    const fetchAllActors = async () => {
        const response = await getAllActors();
        console.log(response);
        setActorsData(response);
    }

    useEffect(() => {
        fetchAllActors();
    }, []);


	return (
        <div>ConfigureMovie</div>
    );
}

export default ConfigureMovie;