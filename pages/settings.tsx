import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";

import Header from "../components/Header";
import {
  deleteCategory,
  getAllCategories,
  postCategory,
} from "../services/CategoryServices";

const SettingPage = () => {
  const [categories, setCategories] = useState([]);
  const [inputName, setInputName] = useState("");
  const [inputMinWage, setInputMinWage] = useState("");
  const [cookies] = useCookies(["token"]);
  const [isLoading, setIsLoading] = useState(false);

  const AddCategory = async (e: any) => {
    e.preventDefault();
    const trimedInput = inputName.trim(); // Use Regex
    if (trimedInput) {
      await postCategory(
        { name: trimedInput, minWage: Number(inputMinWage) },
        cookies.token
      );
      await fetchData();

      setInputName("");
      setInputMinWage("");
    } else return;
  };

  const DeleteCategory = async (id: string) => {
    await deleteCategory(id, cookies.token);
    setCategories(
      categories.filter((category: { _id: string }) => category._id !== id)
    );
  };

  const fetchData = async () => {
    setIsLoading(true);
    try {
      const { data } = await getAllCategories(cookies.token);
      setCategories(data);
    } catch (error) {
      console.error(error);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Header title="Settings" />
      <div className="flex flex-col bg-white p-5 rounded-md shadow space-y-2">
        <div className="flex">
          <span className="self-center">Your categories: </span>
          <div className="flex-1 bg-gray-100 p-2 rounded space-y-1">
            <div className="flex grid grid-cols-2">
              <div className="col-span-1 font-bold">Name</div>
              <div className="col-span-1 font-bold">Min Wage</div>
            </div>
            {isLoading
              ? "loading..."
              : categories.map(
                  (
                    category: { name: string; minWage: number; _id: string },
                    id
                  ) => (
                    <div
                      className="flex rounded-full px-2 bg-green-200"
                      key={id}
                    >
                      <div className="w-1/2">{category.name}</div>
                      <div className="flex-1">{category.minWage}</div>
                      <button onClick={() => DeleteCategory(category._id)}>
                        X
                      </button>
                    </div>
                  )
                )}
          </div>
        </div>
        <div className="">
          <form onSubmit={AddCategory}>
            <div>
              <span className="">Type categories: </span>
              <input
                type="text"
                onChange={(e) => setInputName(e.target.value)}
                value={inputName}
                className="border-2 px-2 rounded-md h-full focus:outline-none"
                required
              />
              <br />
              <span className="">Type min wage: </span>
              <input
                type="number"
                pattern="[0-9]*"
                onChange={(e) => setInputMinWage(e.target.value)}
                value={inputMinWage}
                className="border-2 px-2 rounded-md h-full focus:outline-none"
                required
              />
            </div>
            <button
              className="px-2 bg-green-500 rounded-md text-white h-full"
              type="submit"
            >
              Add
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
