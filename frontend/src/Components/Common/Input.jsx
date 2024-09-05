/* eslint-disable react/prop-types */
function Input({onChangeHandle, fieldName, placeholder, width="300", value=""}) {
	return (
        <label>
            <p className="ml-1 text-lg">{fieldName}</p>
            <input
                className={`bg-[#242424] border border-[#242424] rounded mt-[2px] p-2 w-[${width}px]`}
                placeholder={placeholder}
                onChange={onChangeHandle}
                defaultValue={value}
            />
        </label>
    );
}

export default Input;