import { useEffect, useState } from "react";
import { getAllActors } from "../services/operations/actorApi";
import { getAllProducers } from "../services/operations/producerApi";
import Select from "react-select";
import Input from "./Common/Input";

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

    const [allActors, setAllActors] = useState([]);
    const [allProducers, setAllProducers] = useState([]);

    const fetchAllActors = async () => {
        const response = await getAllActors();
        console.log(response);
        setAllActors(response);
    }

    const fetchAllProducers = async () => {
        const response = await getAllProducers();
        console.log(response);
        setAllProducers(response);
    }

    useEffect(() => {
        fetchAllActors();
        fetchAllProducers();
    }, []);

    const actorOptions = allActors.map(actor => ({
        value: actor?._id,
        label: actor?.name
    }));
    const producerOptions = allProducers.map(producer => ({
        value: producer?._id,
        label: producer?.name
    }));

    const selectedActors = actorOptions?.filter(opt => data.actors.includes(opt.value));
    const selectedProducer = producerOptions?.find(opt => opt.value===data.producer);

    const handleSubmit = async () => {
        console.log(data);
    }

    const handleActorChange = (selected) => {
        setData(prevData => ({
            ...prevData,
            actors: selected ? selected?.map(opt => opt.value) : []
        }));
    }
    const handleProducerChange = (selected) => {
        setData(prevData => ({
            ...prevData,
            producer: selected ? selected.value : ""
        }));
    }

    console.log(data);

	return (
        <div className="flex flex-col w-full items-center justify-center">
            <p className="text-[30px] mb-1 text-app font-medium">Add Movie</p>
            <form onSubmit={handleSubmit} className="flex flex-row gap-10 justify-between">
                <div className="flex flex-col gap-4">
                    <Input
                        fieldName={"Name"}
                        placeholder={"Enter Movie Name"}
                        onChangeHandle={e => setData({...data, name: e.target.value})}
                    />
                    <Input
                        fieldName={"Year of Release"}
                        placeholder={"Enter Year of Release"}
                        onChangeHandle={e => setData({...data, yearOfRelease: e.target.value})}
                    />
                    <label>
                        <p className="ml-1 text-lg">Plot</p>
                        <textarea
                            className="bg-[#242424] border border-[#242424] rounded mt-[2px] h-[300px] p-2 w-[300px]"
                            placeholder="Enter the Plot of the movie"
                        />
                    </label>
                </div>
                <div className="flex flex-col gap-4">
                    <Input
                        fieldName={"Poster URL"}
                        placeholder={"Enter Valid Image URL"}
                        onChangeHandle={e => setData({...data, poster: e.target.value})}
                    />
                    <Input
                        fieldName={"Trailer Youtube URL"}
                        placeholder={"Enter Valid Youtube URL"}
                        onChangeHandle={e => setData({...data, trailer: e.target.value})}
                    />
                    <label>
                        <p className="ml-1 text-lg">Select Actors</p>
                        <Select
                            className="text-black bg-gray-700 mt-[2px]"
                            isMulti
                            options={actorOptions}
                            value={selectedActors}
                            onChange={handleActorChange}
                            placeholder="Select Actors"
                            isSearchable
                        />
                    </label>
                    <label>
                        <p className="ml-1 text-lg">Select Producer</p>
                        <Select
                            className="text-black bg-gray-700 mt-[2px]"
                            options={producerOptions}
                            value={selectedProducer}
                            onChange={handleProducerChange}
                            placeholder="Select Producer"
                            isSearchable
                        />
                    </label>
                </div>
            </form>
        </div>
    );
}

export default ConfigureMovie;