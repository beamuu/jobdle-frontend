import axios from "axios";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Header from "../components/Header";
import { getAllCategories } from "../services/CategoryServices";
import { postJob } from "../services/JobServices";
import { splitTFromISO } from "../services/UtilsServies";

const defaultValue = {
  title: "",
  detail: "",
  category: {},
  wage: "",
  note: "",
  location: "",
  deadline: 0,
};

const FillDescriptionJobPage: NextPage = () => {
  const [cookies] = useCookies(["token"]);
  const router = useRouter();

  const [categoryObjects, setCategoryObjects] = useState([]);
  const [jobDetailsObject, setJobDetailsObject] = useState(defaultValue);

  const fetchAllCategories = async () => {
    const { data } = await getAllCategories(cookies.token);
    setCategoryObjects(data);
  };

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

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();
    try {
      console.log(jobDetailsObject);
      const { data } = await postJob(jobDetailsObject, cookies.token);
      router.push(`jobdetails/${data._id}`);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    fetchAllCategories();
  }, []);

  const BlockFieldStyles = "sm:grid sm:grid-cols-5 items-center";
  const LabelStyles = "font-bold col-span-1";
  const InputFieldStyles =
    "border-2 border-gray-200 rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:border-blue-500 col-span-4";

  if (!categoryObjects) return null;

  return (
    <div>
      <Header title="Fill job details" />

      <form onSubmit={handlePost}>
        <div className="bg-white p-4 rounded-md space-y-2">
          <div className={BlockFieldStyles}>
            <p className={LabelStyles}>Title </p>
            <input
              type="text"
              className={InputFieldStyles}
              value={jobDetailsObject.title}
              name="title"
              onChange={handleChange}
              // required
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
              // required
            />
          </div>
          <div className={BlockFieldStyles}>
            <p className={LabelStyles}>Category </p>
            <select
              className={`${InputFieldStyles} cursor-pointer`}
              name="category"
              onChange={(e) => handleSelectChange(e.target.value)}
              // required
            >
              <option value="">โปรดเลือก</option>
              {categoryObjects.map((category: any) => {
                return (
                  <option value={JSON.stringify(category)}>
                    {category.name} | minWage: {category.minWage}
                  </option>
                );
              })}
            </select>
          </div>
          <div className={BlockFieldStyles}>
            <p className={LabelStyles}>Note </p>
            <input
              type="text"
              className={InputFieldStyles}
              value={jobDetailsObject.note}
              name="note"
              onChange={handleChange}
            />
          </div>
          <div className={BlockFieldStyles}>
            <p className={LabelStyles}>Location </p>
            <input
              type="text"
              className={InputFieldStyles}
              value={jobDetailsObject.location}
              name="location"
              onChange={handleChange}
              // required
            />
          </div>
          <div className={BlockFieldStyles}>
            <p className={LabelStyles}>Deadline </p>
            <input
              type="date"
              className={InputFieldStyles}
              name="deadline"
              onChange={(e) => handleDateChage(e.target.value)}
              min={splitTFromISO(new Date().toISOString())}
              // required
            />
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button
            className="bg-sky-500 rounded-md p-2 text-white"
            type="submit"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default FillDescriptionJobPage;
