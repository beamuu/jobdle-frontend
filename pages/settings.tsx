import React, { useState } from "react";
import Header from "../components/Header";

const SettingPage = () => {
  const [categories, setCategories] = useState(["hello"]);
  const [input, setInput] = useState("");

  const AddCategory = (e: any) => {
    e.preventDefault();
    setCategories([...categories, input]);
    setInput("");
  };
  return (
    <div>
      <Header title="Settings" />

      <div className="flex flex-col bg-white p-5 rounded-md shadow">
        <div className="space-x-2">
          <span>Your categories: </span>
          {/* <button className="rounded-full p-1 border">ซ่อม</button>
          <button className="rounded-full p-1 border">บำรุง</button> */}
          {categories.map((element, id) => (
            <button className="rounded-full p-1 border" key={id}>
              {element}
            </button>
          ))}
        </div>
        <div>
          <span>Type categories: </span>
          <form onSubmit={AddCategory}>
            <input
              type="text"
              onChange={(e) => setInput(e.target.value)}
              value={input}
            />
            <button
              className="px-3 py-1 bg-green-500 rounded-full text-white"
              type="submit"
            >
              +
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
