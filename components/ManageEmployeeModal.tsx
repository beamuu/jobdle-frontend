import React, { useEffect } from "react";
import { useCookies } from "react-cookie";
import { getAllEmployees } from "../services/EmployeeServices";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { editJob, manageJob } from "../services/jobServices";
import Router, { useRouter } from "next/router";

interface Props {
  onClose: any;
  show: boolean;
  cancel: any;
  confirm: any;
  id: string | string[] | undefined;
  token: string;
}

export default function ManageEmployeeModal({
  onClose,
  show,
  cancel,
  confirm,
  id,
  token,
}: Props) {
  const [cookies, setCookie] = useCookies(["token"]);
  const [allEmployees, setAllEmployees] = useState<Employee[]>([]);
  const [selectedEmployeeArray, setSelectedEmployeeArray] = useState<number[]>(
    []
  );
  const router = useRouter();

  useEffect(() => {
    if (!show) return;
    fetchData();
  }, [show]);

  const fetchData = async () => {
    const allEmployees = await getAllEmployees(cookies.token);
    setAllEmployees(allEmployees.data);
  };

  const handleManageEmployees = () => {
    selectedEmployeeArray.sort();
    const selectedEmployees:Employee[] = selectedEmployeeArray.map(
      (index) => allEmployees[index]
    );
    console.log("SelectedEmployees", selectedEmployees);
    console.log("id", id);
    manageJob(id, { employeeId: selectedEmployees, status: "pending" }, token);
    router.push("/dashboard")
  };

  return (
    <>
      <Transition appear show={show} as={Fragment}>
        <Dialog
          as="div"
          className="relative z-10"
          onClose={() => onClose(false)}
        >
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-4xl transform overflow-hidden rounded-xl bg-white p-5 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    Manage Employees
                  </Dialog.Title>
                  <div className="w-full bg-gray-100 rounded my-3 p-2 grid grid-cols-5 space-x-2">
                    {allEmployees.map((employee, index) => {
                      return (
                        <div
                          className={`${
                            selectedEmployeeArray.includes(index)
                              ? "outline outline-offset-2 outline-sky-500"
                              : ""
                          } bg-white flex flex-col items-center rounded-md hover:shadow-lg cursor-pointer p-2`}
                          key={employee._id}
                          onClick={() => {
                            if (selectedEmployeeArray.includes(index)) {
                              setSelectedEmployeeArray(
                                selectedEmployeeArray.filter(
                                  (element) => element !== index
                                )
                              );
                            } else {
                              setSelectedEmployeeArray([
                                ...selectedEmployeeArray,
                                index,
                              ]);
                            }
                          }}
                        >
                          <div id="image" className="flex justify-center py-2">
                            <div className="bg-sky-500 rounded-full w-32 h-32"></div>
                          </div>
                          <div
                            id="details"
                            className="flex flex-col items-center"
                          >
                            <span>
                              {employee.firstname} {employee.lastname}
                            </span>
                            <span className="text-gray-400">
                              Front Developer
                            </span>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="mt-4 flex justify-end space-x-4">
                    <button
                      type="button"
                      className="inline-flex justify-center rounded border border-transparent bg-gray-100 px-4 py-2 text-sm font-medium text-gray-900 hover:bg-gray-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={cancel}
                    >
                      Cancel
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center rounded border border-transparent bg-sky-100 px-4 py-2 text-sm font-medium text-sky-900 hover:bg-sky-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                      onClick={handleManageEmployees}
                    >
                      Manage
                    </button>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
}
