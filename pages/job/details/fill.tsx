import { NextPage } from "next";
import { useRouter } from "next/router";
import { FormEvent, useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import { getAllCategories } from "../../../services/CategoryServices";
import { postJob } from "../../../services/JobServices";
import { handleUpload, splitTFromISO } from "../../../services/UtilsServices";
import Header from "../../../components/Header";
import { PhotoIcon } from "@heroicons/react/24/outline";

const defaultValue = {
  pictureUrl: [""],
  title: "",
  detail: "",
  category: {},
  wage: "",
  note: "",
  location: "",
  deadline: "",
};

const FillDescriptionJobPage: NextPage = () => {
  const [cookies] = useCookies(["token"]);
  const router = useRouter();

  const [categoryObjects, setCategoryObjects] = useState([]);
  const [jobDetailsObject, setJobDetailsObject] = useState(defaultValue);
  const [files, setFiles] = useState<File[]>([]);

  const fetchAllCategories = async () => {
    const { data } = await getAllCategories(cookies.token);
    setCategoryObjects(data);
  };

  useEffect(() => {
    if (files.length > 5) {
      files.length = 5;
    }
    fetchAllCategories();
  }, []);

  const handleChange = (e: any) => {
    setJobDetailsObject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  function handleChangeFile(event: any) {
    if (files.length > 5) {
      alert("Maximum is 5 pictures.");
      return;
    }
    const filesArray: File[] = Array.from(event.target.files);
    setFiles([...files, ...filesArray]);
    console.log(filesArray);
  }

  const handleSelectChange = (myStringifyObject: string) => {
    const prasedObject = JSON.parse(myStringifyObject);
    setJobDetailsObject({ ...jobDetailsObject, category: prasedObject });
  };

  const handleDateChage = (date: any) => {
    setJobDetailsObject({ ...jobDetailsObject, deadline: date });
  };

  const handlePost = async (e: FormEvent) => {
    e.preventDefault();
    let submitedData = jobDetailsObject;
    if (!submitedData) return;
    if (files) {
      try {
        const uploadedPictureArray: string[] = [];
        files.forEach(async (file) => {
          uploadedPictureArray.push(await handleUpload(file));
        });
        submitedData.pictureUrl = uploadedPictureArray;
      } catch (error) {
        console.error(error);
      }
    }
    console.log("submitedData", submitedData);
    try {
      console.log(jobDetailsObject);
      const { data } = await postJob(jobDetailsObject, cookies.token);
      router.push(`${data._id}`);
    } catch (err) {
      console.error(err);
    }
  };

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
          <div className="py-2">
            <div className="flex flex-col items-center">
              <div>
                <p className="font-bold">Pictures (at most 5 photos )</p>
              </div>
              <div className="w-full flex bg-gray-100 rounded-md flex-wrap">
                {files.map((file) => (
                  <div
                    className={`h-40 w-40 m-2 bg-gray-100 rounded-md bg-no-repeat bg-cover bg-center flex justify-center items-center`}
                    style={{
                      backgroundImage: `url(${
                        file ? URL.createObjectURL(file) : null
                      })`,
                    }}
                  >
                    {file || jobDetailsObject.pictureUrl ? null : (
                      <div>
                        <PhotoIcon className="w-auto" />
                        <p>No Image</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
              <div className="px-5 my-3">
                <input
                  type="file"
                  id="edit-avatar"
                  onChange={handleChangeFile}
                  accept="image/*"
                  className="w-full m-auto bg-gray-100"
                  multiple
                />
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-end mt-2">
          <button
            className="bg-sky-600 hover:bg-sky-400 rounded-md p-2 text-white"
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
