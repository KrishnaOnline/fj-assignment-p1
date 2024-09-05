/* eslint-disable react/prop-types */
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import Select from "react-select";
import { useState } from "react";
import Input from "./Common/Input";
import { useSelector } from "react-redux";
import { createActor } from "../services/operations/actorApi";
import { createProducer } from "../services/operations/producerApi";

const style = {
	position: "absolute",
	top: "50%",
	left: "50%",
	transform: "translate(-50%, -50%)",
	width: 400,
	bgcolor: "black",
    color: "white",
	border: "2px solid #374151",
    borderRadius: "10px",
	boxShadow: 24,
	p: 4,
};

export default function BasicModal({field, open, setOpen, handleOpen, handleClose}) {
    const {token} = useSelector(state => state.auth);

    const [data, setData] = useState({
        name: "",
        gender: "",
        dateOfBirth: "",
        bio: "",
    });

    const genderOptions = [
        {value: "Male", label: "Male"},
        {value: "Female", label: "Female"},
        {value: "Other", label: "Other"},
    ];
    const selectedGender = genderOptions?.find(opt => opt.value===data.gender);

    const handleGenderChange = (selected) => {
        setData(prevData => ({
            ...prevData,
            gender: selected ? selected.value : ""
        }));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(field==="Actor") {
            const response = await createActor(data, token);
            console.log(response);
            setOpen(false);
        } else if(field==="Producer") {
            const response = await createProducer(data, token);
            console.log(response);
            setOpen(false);
        }
    }
    console.log(data);

	return (
		<div>
			<Modal
				open={open}
				onClose={handleClose}
			>
				<Box sx={style} /*className="bg-black w-[400px] h-[400px] top-1/2 left-1/2"*/>
                    <div className="flex flex-col items-center justify-center">
                        <p className="text-[20px] mb-1 text-app font-medium">Add {field}</p>
                        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                            <Input
                                fieldName={"Name"}
                                placeholder={`Enter ${field} name`}
                                onChangeHandle={e => setData({...data, name: e.target.value})}
                            />
                            <label>
                                <p className="ml-1 text-lg">Select Gender</p>
                                <Select
                                    className="text-black bg-gray-700 mt-[2px]"
                                    options={genderOptions}
                                    value={selectedGender}
                                    onChange={handleGenderChange}
                                    placeholder={`Select ${field} gender`}
                                    isSearchable
                                />
                            </label>
                            <Input
                                fieldName={"Date of Birth"}
                                placeholder={"Enter DOB as YYYY-MM-DD"}
                                onChangeHandle={e => setData({...data, dateOfBirth: e.target.value})}
                            />
                            <label>
                                <p className="ml-1 text-lg">Bio</p>
                                <textarea
                                    className="bg-[#242424] border border-[#242424] rounded mt-[2px] h-[100px] p-2 w-[300px]"
                                    placeholder={"Enter the bio of the "+field}
                                    onChange={e => setData({...data, bio: e.target.value})}
                                />
                            </label>
                            <button
                                className="bg-app mt-3 w-full text-xl font-medium hover:opacity-90 p-2 text-black rounded"
                                type="submit"
                                onClick={handleSubmit}
                            >
                                Submit   
                            </button>
                        </form>
                    </div>
				</Box>
			</Modal>
		</div>
	);
}