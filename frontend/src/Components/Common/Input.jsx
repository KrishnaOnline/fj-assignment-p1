import React from "react";

function Input({onChangeHandle, fieldName, placeholder}) {
	return (
        <label>
            <p className="ml-1 text-lg">{fieldName}</p>
            <input
                className="bg-[#242424] border border-[#242424] rounded mt-[2px] p-2 w-[300px]"
                placeholder={placeholder}
                // onChange={e => setData({...data, username: e.target.value})}
                onChange={onChangeHandle}
            />
        </label>
    );
}

export default Input;