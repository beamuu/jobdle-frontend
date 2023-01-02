import React from 'react'

const dateFormat = (today: Date) => {
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let currentDate = `${dd}/${mm}/${yyyy}`;
    return currentDate;
};

function FillemployeedetailPage() {
    return (
        <div>
            <div className="text-sky-700 font-bold text-2xl pb-3">Employee detail</div>
            <span className="bg-white rounded-md px-2 py-1 bg-green-200">
                {dateFormat(new Date())}
            </span>
            <hr className="my-3" />
            <div className="flex flex-col lg:flex lg:flex-row bg-white py-5 rounded-md shadow">
                <div className="flex justify-center px-5">
                    <div className="h-60 w-60 bg-gray-200 rounded-full flex justify-center items-center">
                        Picture
                    </div>
                </div>
                <div className="px-5 lg:w-2/3">
                    <div>
                        <div>
                            <div className="mb-3 lg:flex">
                                <div className="lg:flex-1 lg:mr-3">
                                    <label className="block font-medium text-gray-700 my-1">
                                        First name
                                    </label>
                                    <input
                                        className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="text"
                                        placeholder=""
                                        name="firstname"
                                    />
                                </div>
                                <div className="lg:flex-1">
                                    <label className="block font-medium text-gray-700 my-1">
                                        Surname
                                    </label>
                                    <input
                                        className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="text"
                                        placeholder=""
                                        name="lastname"
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="block font-medium text-gray-700 my-1">
                                    Email address
                                </label>
                                <input
                                    className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    type="text"
                                    placeholder="Your email"
                                    name="email"
                                />
                            </div>
                            <div className="mb-3">
                                <label className="block font-medium text-gray-700 my-1">
                                    Tel.
                                </label>
                                <input
                                    className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    type="text"
                                    placeholder=""
                                    name="tel"
                                />
                            </div>
                            <div className="mb-3 lg:flex">
                                <div className="lg:flex-1 lg:mr-3">
                                    <label className="block font-medium text-gray-700 my-1">
                                        Age
                                    </label>
                                    <input
                                        className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="text"
                                        placeholder=""
                                        name="age"
                                    />
                                </div>
                                <div className="lg:flex-1">
                                    <label className="block font-medium text-gray-700 my-1">
                                        Gender
                                    </label>
                                    <input
                                        className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                        type="text"
                                        placeholder=""
                                        name="gender"
                                    />
                                </div>
                            </div>
                            <div className="mb-3">
                                <label className="block font-medium text-gray-700 my-1">
                                    Details
                                </label>
                                <textarea
                                    className="border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500"
                                    rows={10}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex justify-end pt-2'>
                <button className='p-2 bg-sky-500 rounded-md text-white'>Send</button>
            </div>
        </div>
    )
}

export default FillemployeedetailPage