import { useState } from "react";
import ConfigureMovie from "../Components/ConfigureMovie";

function AddMovie() {
    const [data, setData] = useState({
        name: "",
        yearOfRelease: "",
        plot: "",
        poster: "",
        trailer: "",
        actors: [],
        producer: "",
    });

	return (
        <div>
            <ConfigureMovie data={data} setData={setData} type={"Add"}/>
        </div>
    );
}

export default AddMovie;