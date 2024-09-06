/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import { getAllActors } from "../services/operations/actorApi";
import { getAllProducers } from "../services/operations/producerApi";
import Select from "react-select";
import Input from "./Common/Input";
import { createMovie, updateMovie } from "../services/operations/movieApi";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import BasicModal from "./Modal";

function ConfigureMovie({type, data, setData}) {
    const {token} = useSelector(state => state.auth);
    const navigate = useNavigate();
	const [open, setOpen] = useState(false);
	const handleOpen = () => setOpen(true);
	const handleClose = () => setOpen(false);
    const [field, setField] = useState("");
    const {movieId} = useParams();

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
    }, [open, type]);

    const actorOptions = allActors?.map(actor => ({
        value: actor?._id,
        label: actor?.name
    }));
    const producerOptions = allProducers?.map(producer => ({
        value: producer?._id,
        label: producer?.name
    }));

    const handleActorChange = (selected) => {
        if(type==="Edit") {
            setData(prevData => ({
                ...prevData,
                actors: selected ? selected.map(opt => ({
                    _id: opt.value,
                    name: opt.label
                })) : []
            }));
        } else if(type==="Add") {
            setData(prevData => ({
                ...prevData,
                actors: selected ? selected?.map(opt => opt.value) : []
            }));
        }
    }
    const handleProducerChange = (selected) => {
        if(type==="Edit") {
            setData(prevData => ({
                ...prevData,
                producer: selected ? { 
                    _id: selected.value,
                    name: selected.label
                } : null
            }));
        } else if(type==="Add") {
            setData(prevData => ({
                ...prevData,
                producer: selected ? selected.value : ""
            }));
        }
    }

    console.log(data);
    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(data);
        if(type==="Add") {
            const response = await createMovie(data, token, navigate);
            console.log(response);
        } else if(type==="Edit") {
            const response = await updateMovie(data, movieId, token, navigate);
            console.log(response);
        }
    }

    let selectedActors = [];
    let selectedProducer = [];
    if(type==="Edit") {
        selectedActors = data?.actors?.map(actor => ({
            value: actor?._id,
            label: actor?.name,
        }));
        selectedProducer = {
            value: data?.producer?._id,
            label: data?.producer?.name,
        };
    } else if(type==="Add") {
        selectedActors = actorOptions?.filter(opt => data?.actors.includes(opt.value));
        selectedProducer = producerOptions?.find(opt => opt.value===data?.producer);
    }

	return (
        <div className="flex flex-col w-full mt-5 mb-10 items-center justify-center">
            <p className="text-[30px] mb-8 text-app font-medium">{type} Movie</p>
            <form onSubmit={handleSubmit} className="flex flex-row max-sm:flex-col md:gap-10 gap-5 justify-between">
                <div className="flex flex-col gap-4">
                    <Input
                        value={data?.name}
                        fieldName={"Name"}
                        placeholder={"Enter Movie Name"}
                        onChangeHandle={e => setData({...data, name: e.target.value})}
                    />
                    <Input
                        value={new Date(data?.yearOfRelease).getFullYear()}
                        fieldName={"Year of Release"}
                        placeholder={"Enter Year of Release"}
                        onChangeHandle={e => setData({...data, yearOfRelease: e.target.value})}
                    />
                    <label>
                        <p className="ml-1 text-lg">Plot</p>
                        <textarea
                            defaultValue={data?.plot}
                            className="bg-[#242424] border border-[#242424] rounded mt-[2px] h-[280px] p-2 w-[300px]"
                            placeholder="Enter the Plot of the movie"
                            onChange={e => setData({...data, plot: e.target.value})}
                        />
                    </label>
                </div>
                <div className="flex flex-col gap-4">
                    <Input
                        value={data?.poster}
                        fieldName={"Poster URL"}
                        placeholder={"Enter Valid Image URL"}
                        onChangeHandle={e => setData({...data, poster: e.target.value})}
                    />
                    {console.log(data?.trailer)}
                    <Input
                        value={ type === "Edit"
                            ? (data?.trailer ? `https://www.youtube.com/watch?v=${data?.trailer}` : '')
                            : data?.trailer
                        }
                        fieldName={"Trailer Youtube URL"}
                        placeholder={"Enter Valid Youtube URL"}
                        onChangeHandle={e => setData({...data, trailer: e.target.value})}
                    />
                    <label>
                        <p className="ml-1 text-lg">Select Actors</p>
                        <Select
                            className="text-black bg-gray-700 mt-[2px] max-w-[300px]"
                            isMulti
                            options={actorOptions}
                            value={selectedActors}
                            onChange={handleActorChange}
                            placeholder="Select Actors"
                            isSearchable
                        />
                        <button className="text-blue-400 pl-1 mt-1 underline" type="button" 
                            onClick={() => {
                                setField("Actor");
                                setOpen(true);
                            }
                        }>
                            Add new Actor
                        </button>
                    </label>
                    <label>
                        <p className="ml-1 text-lg">Select Producer</p>
                        <Select
                            className="text-black bg-gray-700 mt-[2px] max-w-[300px]"
                            options={producerOptions}
                            value={selectedProducer}
                            onChange={handleProducerChange}
                            placeholder="Select Producer"
                            isSearchable
                        />
                        <button className="text-blue-400 pl-1 mt-1 underline" type="button" 
                            onClick={() => {
                                setField("Producer");
                                setOpen(true);
                            }
                        }>
                            Add new Producer
                        </button>
                    </label>
                    <button
                        className="bg-app mt-8 w-full text-xl font-medium hover:opacity-90 p-2 text-black rounded"
                        type="submit"
                        onClick={handleSubmit}
                    >
                        Submit   
                    </button>
                </div>
            </form>
            {
                open && <BasicModal field={field} open={open} setOpen={setOpen} handleOpen={handleOpen} handleClose={handleClose}/>
            }
        </div>
    );
}

export default ConfigureMovie;