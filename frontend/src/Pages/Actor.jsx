import { useParams } from "react-router-dom";
import { getActor } from "../services/operations/actorApi";
import { useEffect, useState } from "react";
import Individual from "../Components/Individual";

function Actor() {
    const {actorId} = useParams();
    const [actor, setActor] = useState(null);

    const fetchActor = async () => {
        const response = await getActor(actorId);
        console.log(response);
        setActor(response);
    }

    useEffect(() => {
        fetchActor();
    }, [actorId]);

	return (
        <div>
            <Individual data={actor} role={"Actor"}/>
        </div>
    );
}

export default Actor;