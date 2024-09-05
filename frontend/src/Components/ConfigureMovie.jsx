import { useEffect, useState } from "react";
import { getAllActors } from "../services/operations/actorApi";
import { getAllProducers } from "../services/operations/producerApi";
import Select from "react-select";
import Input from "./Common/Input";
import { createMovie } from "../services/operations/movieApi";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

function ConfigureMovie() {
    const {token} = useSelector(state => state.auth);
    const [data, setData] = useState({
        name: "",
        yearOfRelease: "",
        plot: "",
        poster: "",
        trailer: "",
        actors: [],
        producer: "",
    });
    const navigate = useNavigate();

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
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        const response = await createMovie(data, token, navigate);
        console.log(response);
    }

	return (
        <div className="flex flex-col w-full mt-5 mb-10 items-center justify-center">
            <p className="text-[30px] mb-8 text-app font-medium">Add Movie</p>
            <form onSubmit={handleSubmit} className="flex flex-row max-sm:flex-col md:gap-10 gap-5 justify-between">
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
                            onChange={e => setData({...data, plot: e.target.value})}
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
                    <button
                        className="bg-app mt-10 w-full text-xl font-medium hover:opacity-90 p-2 text-black rounded"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit   
                    </button>
                </div>
            </form>
        </div>
    );
}

export default ConfigureMovie;