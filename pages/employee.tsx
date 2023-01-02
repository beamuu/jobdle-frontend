import { Router, useRouter } from 'next/router';
import React from 'react'

const dateFormat = (today: Date) => {
    let dd = today.getDate();
    let mm = today.getMonth() + 1;
    let yyyy = today.getFullYear();
    let currentDate = `${dd}/${mm}/${yyyy}`;
    return currentDate;
};

function EmployeePage() {
    const router = useRouter();
    return (
        <div>
            <div className="text-sky-700 font-bold text-2xl pb-3">Employee</div>
            <span className="bg-white rounded-md px-2 py-1 bg-green-200">
                {dateFormat(new Date())}
            </span>
            <hr className="my-3" />
            <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-white flex rounded-md shadow cursor-pointer h-40 p-2"
                    onClick={() => router.push("/employeedetails")}>
                    <div className="bg-red-500 w-24 rounded-md w-32">
                        Picture
                    </div>
                    <div className='pl-2'>
                        <p>นภสินธ์ แสงทอง</p>
                        <p>ความถนัด</p>
                    </div>
                </div>
                <div className="bg-white flex rounded-md shadow cursor-pointer h-40 p-2"
                    onClick={() => router.push("/employeedetails")}>
                    <div className="bg-red-500 w-24 rounded-md w-32">
                        Picture
                    </div>
                    <div className='pl-2'>
                        <p>นภสินธ์ แสงทอง</p>
                        <p>ความถนัด</p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default EmployeePage