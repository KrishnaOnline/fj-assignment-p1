import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getProducer } from "../services/operations/producerApi";
import Individual from "../Components/Individual";

function Producer() {
    const {producerId} = useParams();
    const [producer, setProducer] = useState(null);

    const fetchProducer = async () => {
        const response = await getProducer(producerId);
        setProducer(response);
    }

    useEffect(() => {
        fetchProducer();
    }, [producerId]);

	return (
        <div>
            <Individual data={producer} role={"Producer"}/>
        </div>
    );
}

export default Producer;