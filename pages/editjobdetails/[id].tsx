import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Header from "../../components/Header";
import { getAllCategories } from "../../services/CategoryServices";
import { editJob, getJob } from "../../services/JobServices";
import { splitTFromISO } from "../../services/UtilsServices";

const defaultValue = {
  title: "",
  detail: "",
  category: {
    name: "",
    minWage: 0,
  },
  note: "",
  location: "",
  deadline: "",
};

const EditDescriptionJobPage: NextPage = () => {
  const [cookies] = useCookies(["token"]);
  const router = useRouter();
  const { id } = router.query;

  const [categories, setCategories] = useState([]);
  const [jobDetailsObject, setJobDetailsObject] =
    useState<JobEditable>(defaultValue);

  const handleChange = (e: any) => {
    setJobDetailsObject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (myStringifyObject: string) => {
    const prasedObject = JSON.parse(myStringifyObject);
    setJobDetailsObject({ ...jobDetailsObject, category: prasedObject });
  };

  const handleDateChage = (date: any) => {
    setJobDetailsObject({ ...jobDetailsObject, deadline: date });
  };

  const handleEdit = async (e: FormEvent) => {
    e.preventDefault();
    if (!id) return;
    await editJob(id, jobDetailsObject, cookies.token);
    router.push(`/jobdetails/${id}`);
  };

  const fetchAllCategories = async () => {
    const { data } = await getAllCategories(cookies.token);
    setCategories(data);
  };

  const fetchData = async () => {
    try {
      if (id) {
        const { data } = await getJob(id, cookies.token);
        setJobDetailsObject(data);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchAllCategories();
    fetchData();
  }, [router]);

  if (!jobDetailsObject) return null;

  const BlockFieldStyles = "sm:grid sm:grid-cols-5 items-center";
  const LabelStyles = "font-bold col-span-1 self-center";
  const InputFieldStyles =
    "border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 col-span-4";

  return (
    <>
      <Header title="Edit job details" />

      <form onSubmit={handleEdit}>
        <div className="bg-white p-4 rounded-md space-y-2">
          <div className={BlockFieldStyles}>
            <p className={LabelStyles}>Title </p>
            <input
              type="text"
              className={InputFieldStyles}
              value={jobDetailsObject.title}
              name="title"
              onChange={handleChange}
              required
            />
          </div>
          <div className={BlockFieldStyles}>
            <p className={LabelStyles}>Detail </p>
            <textarea
              className={InputFieldStyles}
              rows={10}
              value={jobDetailsObject.detail}
              name="detail"
              onChange={handleChange}
              required
            />
          </div>
          <div className={BlockFieldStyles}>
            <p className={LabelStyles}>Category </p>
            <p>{jobDetailsObject.category.name}</p>
            {/* <select
              className={InputFieldStyles}
              name="category"
              onChange={(e) => handleSelectChange(e.target.value)}
              defaultValue={jobDetailsObject.category.name}
              required
            >
              {categories.map((category) => {
                return (
                  <option value={JSON.stringify(category)}>
                    {category.name} | minWage: {category.minWage}
                  </option>
                );
              })}
            </select> */}
          </div>
          <div className={BlockFieldStyles}>
            <p className={LabelStyles}>Location </p>
            <input
              type="text"
              className={InputFieldStyles}
              value={jobDetailsObject.location}
              name="location"
              onChange={handleChange}
              required
            />
          </div>
          <div className={BlockFieldStyles}>
            <p className={LabelStyles}>Deadline </p>
            <input
              type="date"
              className={InputFieldStyles}
              value={splitTFromISO(jobDetailsObject.deadline)}
              name="deadline"
              onChange={(e) => handleDateChage(e.target.value)}
              //   required
            />
          </div>
        </div>
        <div className="flex justify-between mt-2">
          <button
            className="bg-red-500 rounded-md p-2 text-white"
            onClick={() => router.push(`/jobdetails/${id}`)}
          >
            Cancel
          </button>
          <button
            className="bg-yellow-500 rounded-md py-2 px-3 text-white"
            type="submit"
          >
            Edit
          </button>
        </div>
      </form>
    </>
  );
};

export default EditDescriptionJobPage;
