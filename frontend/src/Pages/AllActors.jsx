import { useEffect, useState } from "react";
import AllIndividuals from "../Components/AllIndividuals";
import { getAllActors } from "../services/operations/actorApi";

function AllActors() {
    const [data, setData] = useState(null);
    
    const fetchAllActors = async () => {
        const response = await getAllActors();
        setData(response);
    }
    useEffect(() => {
        fetchAllActors();
    }, []);

	return (
        <div>
            <AllIndividuals data={data} role={"Actor"}/>
        </div>
    );
}

export default AllActors;