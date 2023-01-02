import React from 'react'

function EmployeedetailsPage() {
    return (
        <div>
            <div className="text-sky-700 font-bold text-2xl pb-3">Job details</div>
            <span className="rounded-md px-2 py-1 bg-green-200">2 ตุลาคม</span>
            <hr className="my-3" />
            <div className="flex flex-col lg:flex lg:flex-row bg-white py-5 rounded-md shadow">
                <div className="flex justify-center px-5 pb-5">
                    <div className="h-60 w-60 bg-gray-200 rounded-full flex justify-center items-center">
                        Picture
                    </div>
                </div>
                <div className="px-5 lg:w-2/3 divide-y ">
                    <div className="sm:grid sm:grid-cols-4">
                        <p className="font-bold col-span-1">ชื่อ - นามสกุล </p>
                        <p className="w-full sm:col-span-3">นภสินธ์ แสงทอง</p>
                    </div>
                    <div className="sm:grid sm:grid-cols-4">
                        <p className="font-bold col-span-1">รายละเอียด </p>
                        <p className="w-full sm:col-span-3">Lorem ipsum dolor, sit amet consectetur adipisicing elit. Perspiciatis debitis voluptates voluptatibus temporibus error delectus sint optio odit ut! Excepturi molestias modi numquam quaerat rem ipsum error, architecto similique quasi eos eveniet dolores accusamus ex soluta unde dolorem in delectus porro molestiae totam laudantium voluptates temporibus distinctio. Sit, impedit delectus?</p>
                    </div>
                    <div className="sm:grid sm:grid-cols-4">
                        <p className="font-bold col-span-1">ความถนัด </p>
                        <p className="w-full sm:col-span-3">hello</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeedetailsPage