import { Link } from "react-router-dom";

/* eslint-disable react/prop-types */
function AllIndividuals({data, role}) {
    console.log(data);
	return (
        <div className="mt-5 mb-20 flex flex-col flex-wrap">
            <div className="pl-5 flex flex-col flex-wrap gap-3 /*border-b border-gray-700*/ pb-3">
                <p className="text-4xl text-app">{role}s</p>
            </div>
            <div className="flex flex-wrap mt-5 gap-5 justify-center w-full mx-auto">
                {
                    data?.map(p => (
                        <Link to={`/${role.toLowerCase()}/${p?._id}`} className="flex max-md:w-full hover:bg-gray-800 max-md:h-fit flex-col w-[300px] h-[200px] border-2 border-gray-700 rounded-lg p-3" key={p?._id}>
                            <p className="text-xl mb-1 font-medium border-b pb-1 border-gray-700">
                                {p?.name?.substring(0, 30)}{p?.name?.length>20 && "..."} <span className="text-sm text-gray-300">({p?.gender})</span>
                            </p>
                            <p className="text-gray-400 text-justify">
                                {p?.bio.substring(0, 150)}{p?.bio?.length>70 && "..."}
                            </p>
                        </Link>
                    ))
                }
            </div>
        </div>
    );
}

export default AllIndividuals;