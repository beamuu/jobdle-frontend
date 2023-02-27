import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { useUser } from "../../../contexts/User";
import {
  deleteEmployee,
  getEmployee,
} from "../../../services/EmployeeServices";
import ComfirmModal from "../../../components/ComfirmModal";
import Header from "../../../components/Header";

const EmployeedetailsPage = () => {
  const [cookies, setCookie, removeCookie] = useCookies(["token"]);
  const router = useRouter();
  const { id } = router.query;
  const { userData } = useUser();

  const [employeeDetail, setEmployeeDetail] = useState<Employee>();
  const [showDeleteEmployeeModal, setShowDeleteEmployeeModal] = useState(false);

  const handleDeleteEmployee = async () => {
    await deleteEmployee(id, cookies.token);
    router.push("/employee");
  };

  const pushEditEmployee = () => {
    router.push(`/employee/edit/${id}`);
  };

  useEffect(() => {
    if (id) {
      getEmployee(id, cookies.token)
        .then((res) => {
          setEmployeeDetail(res.data);
        })
        .catch((err) => console.error(err));
    }
  }, [router]);

  if (employeeDetail === undefined) return null;

  if (userData === undefined) return null;

  return (
    <>
      <Header title="Employee details" />
      <div className="flex flex-col lg:flex lg:flex-row bg-white py-5 rounded-md">
        <div className="flex justify-center px-5 pb-5" id="picture">
          <div className="h-60 w-60 bg-gray-200 rounded-full flex justify-center items-center">
            Picture
          </div>
        </div>
        <div className="px-5 lg:w-2/3 divide-y">
          <div className="sm:grid sm:grid-cols-4 py-1">
            <p className="font-bold col-span-1">ชื่อ - นามสกุล </p>
            <p className="w-full sm:col-span-3">
              {employeeDetail.firstname} {employeeDetail.lastname}
            </p>
          </div>
          <div className="sm:grid sm:grid-cols-4 py-1">
            <p className="font-bold col-span-1">Email </p>
            <p className="w-full sm:col-span-3">{employeeDetail.email}</p>
          </div>
          <div className="sm:grid sm:grid-cols-4 py-1">
            <p className="font-bold col-span-1">Gender </p>
            <p className="w-full sm:col-span-3">{employeeDetail.gender}</p>
          </div>
          <div className="sm:grid sm:grid-cols-4 py-1">
            <p className="font-bold col-span-1">Tel. </p>
            <p className="w-full sm:col-span-3">{employeeDetail.tel}</p>
          </div>
          <div className="sm:grid sm:grid-cols-4 py-1">
            <p className="font-bold col-span-1">Age </p>
            <p className="w-full sm:col-span-3">{employeeDetail.age}</p>
          </div>
          <div className="sm:grid sm:grid-cols-4 py-1">
            <p className="font-bold col-span-1">Works </p>
            <p className="w-full sm:col-span-3">{employeeDetail.works}</p>
          </div>
        </div>
      </div>
      {userData.role === "admin" ? (
        <div className="flex justify-end space-x-2 mt-3">
          <button
            className="p-2 bg-yellow-500 rounded-md text-white"
            onClick={pushEditEmployee}
          >
            Edit
          </button>
          <button
            className="p-2 bg-red-500 rounded-md text-white"
            onClick={() => setShowDeleteEmployeeModal(true)}
          >
            Delete
          </button>
        </div>
      ) : null}

      <ComfirmModal
        onClose={setShowDeleteEmployeeModal}
        show={showDeleteEmployeeModal}
        cancel={() => setShowDeleteEmployeeModal(false)}
        confirm={handleDeleteEmployee}
        title="Are you sure you delete this employee ?"
        cancelButtonValue="Cancel"
        confirmButtonValue="Confirm"
        confirmButtonColor="red"
      />
    </>
  );
};

export default EmployeedetailsPage;
