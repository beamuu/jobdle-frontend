import React from "react";

const SettingPage = () => {
  return (
    <div>
      <div className="block font-bold text-2xl text-sky-700 pb-5">Settings</div>
      <div className="flex flex-col bg-white p-5 rounded-md shadow">
        <div className="space-x-2">
          <span>Your categories: </span>
          <button className="rounded-full p-1 border">ซ่อม</button>
          <button className="rounded-full p-1 border">บำรุง</button>
        </div>
        <div className="">
          <span>Set categories: </span>
          <button className="px-3 py-1 bg-green-500 rounded-full text-white">
            +
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingPage;
