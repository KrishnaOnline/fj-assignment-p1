import { useEffect, useState } from "react";
import { getAllProducers } from "../services/operations/producerApi";
import AllIndividuals from "../Components/AllIndividuals";

function AllProducers() {
    const [data, setData] = useState(null);

    const fetchAllProducers = async () => {
        const response = await getAllProducers();
        setData(response);
    }
    useEffect(() => {
        fetchAllProducers();
    }, []);

	return (
        <div>
            <AllIndividuals data={data} role={"Producer"}/>
        </div>
    );
}

export default AllProducers;